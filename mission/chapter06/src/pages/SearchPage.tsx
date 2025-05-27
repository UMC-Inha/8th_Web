import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import LPCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import "./SearchPage.css";

const fetchSearchResults = async ({ pageParam = 0, queryKey }: any) => {
  const [, { keyword, type, order }] = queryKey;

  const basePath = type === "title" ? "/v1/lps" : `/v1/lps/tag/${keyword}`;

  const params =
    type === "title"
      ? { cursor: pageParam, limit: 10, search: keyword, order }
      : { cursor: pageParam, limit: 10, order };

  const res = await axiosInstance.get(basePath, { params });
  return res.data.data;
};

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<"title" | "tag">("title");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const debouncedKeyword = useDebounce(keyword, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    ["search", { keyword: debouncedKeyword, type, order }],
    fetchSearchResults,
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      enabled: false,
    }
  );

  useEffect(() => {
    if (debouncedKeyword.trim()) refetch();
  }, [debouncedKeyword, type, order, refetch]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const allResults = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="search-container">
      <div className="search-bar">
        🔍
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "title" | "tag")}
        >
          <option value="title">제목</option>
          <option value="tag">태그</option>
        </select>
      </div>

      <div className="sort-buttons">
        <button
          className={order === "asc" ? "active" : ""}
          onClick={() => setOrder("asc")}
        >
          오래된순
        </button>
        <button
          className={order === "desc" ? "active" : ""}
          onClick={() => setOrder("desc")}
        >
          최신순
        </button>
      </div>

      <div className="lp-grid">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : allResults.map((lp) => <LPCard key={lp.id} lp={lp} />)}

        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`more-${i}`} />
          ))}
      </div>

      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default SearchPage;
