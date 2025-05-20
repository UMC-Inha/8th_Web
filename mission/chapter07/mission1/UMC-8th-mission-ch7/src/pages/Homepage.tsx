import { useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer"
import { useEffect } from "react";
import LpCard from "../components/LPCard/LpCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { accessToken } = useAuth();
   const navigate = useNavigate();

  const { 
    data: lps, 
    hasNextPage,
    isFetching,
    isPending, 
    fetchNextPage,
    isError, 
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.asc);

   //ref, InView
   //ref-> 특정 HTML 요소를 감시할 수 있다
   //inView -> 그 요소가 화면에 보이면 true 
   const { ref, inView } = useInView({
    threshold:0,
   })


   useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleCardClick = (id: number) => {
    if (!accessToken) {
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      navigate(`/lps/${id}`);
    }
  };

  if (isPending) {
    return (
      <div className="text-center text-white mt-20">
        로딩 중...
      </div>
    );
  }
  

    if (isError)
    return (
      <div className="text-center mt-10 text-red-400">
        데이터를 불러오는 데 실패했습니다.
      </div>
    );

    return (
      <div className="container mx-auto px-4 py-6">
        {/* <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="검색어를 입력하세요"
        /> */}
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {isPending && <LpCardSkeletonList count={20} />} */}
          {lps?.pages
            .map((page) => page.data.data)
            .flat()
            .map((lp) => (
              <div
                key={lp.id}
                className="cursor-pointer"
                onClick={() => handleCardClick(lp.id)}
              >
                <LpCard lp={lp} />
              </div>
            ))}
          {/* {isFetching && <LpCardSkeletonList count={20} />} */}
        </div>
    
        <div ref={ref} className="h-2" />
      </div>
    );    
};

export default HomePage;
