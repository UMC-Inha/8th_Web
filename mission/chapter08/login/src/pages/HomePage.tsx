import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.desc);

  const throttleScroll = useThrottle(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 1000);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      throttleScroll();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        className="border p-4 rounded-sm"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
