import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from 'react-intersection-observer';
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { Lp } from "../types/lp";
import LpCard from "../components/LpCard/LpCard";

const HomePage = () => {
    const {ref, inView } = useInView();
    const [ search, setSearch ] = useState("");
    const {data : lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = 
    useGetInfiniteLpList(10, search, PAGINATION_ORDER.asc);

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
        fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage]);


    console.log(lps?.pages.map((page)=>page.data.data));

    if(isPending) {
        return <div> Loading </div>
    }

    if(isError) {
        return <div> Error </div>
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <input value={search} onChange={(e) => setSearch(e.target.value)}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
                {lps?.pages
                ?.map((page) => page.data.data)
                ?.flat()
                ?.map((lp : Lp) => <LpCard key = {lp.id} lp = {lp}/>)}
                {isFetching && <LpCardSkeletonList count={5} />}
                <div ref={ref} className="h-4" />
            </div>
        </div>
    )
}

export default HomePage;