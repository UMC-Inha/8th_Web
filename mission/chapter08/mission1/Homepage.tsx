import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LPCard/LpCard";
import LpCardSkeletonList from "../components/LPCard/LpCardSkeletonList";
import Modal from "../components/Modal";
import LpModal from "../components/LpModal/LpModel";
import useDebounce from "../hooks/queries/useDebounce";
import { SEARCH_DELAY } from "../constants/delay";


export default function HomePage() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DELAY)

  const [order, setOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const [isLpModalOpen, setIsLpModalOpen] = useState(false);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, debouncedValue, order);
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleCardClick = (id: string) => {
    if (!accessToken) {
      if (
        window.confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")
      ) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${id}`);
    }
  };
  if (isError) return <div className="mt-20">Error...</div>;

  
  return (
    <div className="relative container mx-auto px-4 py-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full sm:w-1/3"
        placeholder="검색어를 입력하세요"
      />
      <div className="flex space-x-2">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 border rounded ${order === PAGINATION_ORDER.desc  ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
          }`}
      >
        최신순
      </button>
      <button
        onClick={() => setOrder(PAGINATION_ORDER.asc)}
        className={`px-4 py-2 border rounded ${order === PAGINATION_ORDER.asc  ? "bg-blue-500 text-white"
          : "bg-white text-gray-700"
        }`}
    >
      오래된순
    </button>
  </div>
</div>

<button
  onClick={() => setIsLpModalOpen(true)}
  className="fixed bottom-8 right-8 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 z-30"
>
  +
</button>

<Modal
  isOpen={isLpModalOpen}
  onClose={() => setIsLpModalOpen(false)}
>
  <LpModal onClose={() => setIsLpModalOpen(false)} />
</Modal>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {isPending && <LpCardSkeletonList count={20} />}
  {lps
          ?.pages.map((page) => page.data.data)
          .flat()
          .map((lp) => (
            <div
              key={lp.id}
              className="cursor-pointer"
              onClick={() => handleCardClick(lp.id.toString())}
            >
              <LpCard lp={lp} />
            </div>
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2" />
    </div>
  );
}