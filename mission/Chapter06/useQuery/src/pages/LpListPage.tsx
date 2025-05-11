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
          limit: 6,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isPending) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isPending, isFetchingNextPage]);

  const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

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
