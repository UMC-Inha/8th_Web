import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { LpCard } from "../components/LpCard/LpCard";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delayTime";
import useThrottle from "../hooks/useThrottle";

export const LpListPage = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.desc);

  // ref -> 특정한 HTML 요소를 감시할 수 있다
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });
  // 3초 간격으로 inView를 throttle
  const throttledInView = useThrottle(inView, 3000);

  useEffect(() => {
    if (throttledInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20">Error!</div>;
  }

  // 데이터 정렬 함수
  const sortedLps = lps?.pages
    ?.map((page) => page.data.data)
    ?.flat()
    ?.sort((a, b) => {
      const dateA = new Date(a.createdAt); // 생성 날짜
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="flex space-x-4">
      <div className="flex-1 px-4">
        <input
          className={"border p-2 rounded-sm mt-5"}
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 정렬 버튼 */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setSortOrder("desc")}
            className={`border px-3 py-1 rounded cursor-pointer hover:bg-zinc-200 active:bg-zinc-500 
              dark:hover:bg-gray-800 dark:active:bg-gray-900 ${
                sortOrder == "desc" ? "border-pink-600" : "border-zinc-300"
              }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            className={`border px-3 py-1 rounded cursor-pointer hover:bg-zinc-200 active:bg-zinc-500
              dark:hover:bg-gray-800 dark:active:bg-gray-900 ${
                sortOrder == "asc" ? "border-pink-600" : "border-zinc-300"
              }`}
          >
            오래된순
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPending && <LpCardSkeletonList count={20} />}
          {sortedLps?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} className="h-2"></div>
      </div>
    </div>
  );
};
