import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  getLps as getLpsApi,
  createLp as createLpApi,
  getLpsByTag as getLpsByTagApi,
} from "../apis/lp";
import { LpCard } from "../components/LpCard";
import { useState, useEffect } from "react";
import { LpCardSkeleton } from "../components/LpCardSkeleton";
import { Lp } from "../types/lp";
import { AddLpModal } from "../components/AddLpModal";
import { uploadImage } from "../apis/upload";
import useDebounce from "../hooks/useDebounce";

const LpListPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<"content" | "tag">("content");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lps", searchType, order, debouncedSearch],
      queryFn: ({ pageParam = 0 }) =>
        searchType === "tag"
          ? getLpsByTagApi({
              tagName: debouncedSearch,
              cursor: pageParam,
              order,
            })
          : getLpsApi({ search: debouncedSearch, cursor: pageParam, order }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  const { ref, inView } = useInView();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createLp } = useMutation({
    mutationFn: async ({
      title,
      content,
      thumbnail,
      tags,
    }: {
      title: string;
      content: string;
      thumbnail: File | null;
      tags: string[];
    }) => {
      let imageUrl = "";

      if (thumbnail) {
        imageUrl = await uploadImage(thumbnail); // 서버에 이미지 업로드
      }

      return createLpApi({
        title,
        content,
        thumbnail: imageUrl,
        tags,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      setIsModalOpen(false);
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isPending) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isPending, isFetchingNextPage]);

  const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-4">
      {isModalOpen && (
        <AddLpModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => createLp(data)}
        />
      )}
      <div className="flex justify-center items-center gap-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "tag" | "content")}
          className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-600"
        >
          <option value="content">내용 검색</option>
          <option value="tag">태그 검색</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            searchType === "tag" ? "태그명을 입력하세요" : "내용을 입력하세요"
          }
          className="px-4 py-2 border rounded w-full max-w-md bg-zinc-900 text-white"
        />
      </div>
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={() => setOrder("desc")}
          className={`border px-4 py-2 rounded hover:bg-zinc-200 active:bg-zinc-300 ${
            order === "desc" ? "border-blue-600" : "border-zinc-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder("asc")}
          className={`border px-4 py-2 rounded hover:bg-zinc-200 active:bg-zinc-300 ${
            order === "asc" ? "border-blue-600" : "border-zinc-300"
          }`}
        >
          오래된순
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          + LP 추가
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {isPending && !data
          ? Array.from({ length: 6 }).map((_, i) => (
              <LpCardSkeleton key={`initial-skeleton-${i}`} />
            ))
          : allLps.map((lp: Lp) => <LpCard key={lp.id} lp={lp} />)}

        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, i) => (
            <LpCardSkeleton key={`next-skeleton-${i}`} />
          ))}
      </div>

      <div ref={ref} style={{ height: "1px" }} />
    </div>
  );
};

export default LpListPage;
