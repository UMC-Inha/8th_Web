import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getLpList } from "../apis/lp";
import { LpCard } from "../components/LpCard";
import { useState, useEffect } from "react";
import { LpCardSkeleton } from "../components/LpCardSkeleton";
import { Lp } from "../types/lp";

const LpListPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lps", order],
      queryFn: ({ pageParam = 0 }) =>
        getLpList({
          cursor: pageParam,
          search: "",
          order,
          limit: 8,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.nextCursor : undefined;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isPending) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isPending]);

  return (
    <div className="p-4">
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {data?.pages.flatMap((page) =>
          page.data.data.map((lp: Lp) => <LpCard key={lp.id} lp={lp} />)
        )}

        {isPending || isFetchingNextPage
          ? Array.from({ length: 8 }).map((_, i) => (
              <LpCardSkeleton key={`skeleton-${i}`} />
            ))
          : null}
      </div>

      <div ref={ref} className="h-10" />
    </div>
  );
};

export default LpListPage;
