import { useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer"
import { useEffect } from "react";
import LpCard from "../components/LPCard/LpCard";
import LpCardSkeletonList from "../components/LPCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
 
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

    if (isError)
    return (
      <div className="text-center mt-10 text-red-400">
        데이터를 불러오는 데 실패했습니다.
      </div>
    );

    return (
     <div className="contanier mx-auto px-4 py-6">
     <input value={search} onChange={(e)=>setSearch(e.target.value)} />
      
      <div 
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          }
        >
          {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
        ?.map((page) => page.data.data)
        ?.flat()
        ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} className="h-2" />
     </div>
    )

};

export default HomePage;
