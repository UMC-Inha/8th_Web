import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import LPCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";
import "./LPListPage.css";

const fetchLPs = async ({ pageParam = 0, queryKey }: any) => {
  const [, order] = queryKey;
  const res = await axios.get("http://localhost:8000/v1/lps", {
    params: {
      cursor: pageParam,
      limit: 20,
      order,
    },
  });
  return res.data.data;
};

const LPListPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(["lps", order], fetchLPs, {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      staleTime: 0,
      cacheTime: 0,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef, hasNextPage, fetchNextPage]);

  const allLPs = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="lp-list-container">
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
          : allLPs.map((lp) => <LPCard key={lp.id} lp={lp} />)}

        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`loadmore-${i}`} />
          ))}
      </div>

      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default LPListPage;
