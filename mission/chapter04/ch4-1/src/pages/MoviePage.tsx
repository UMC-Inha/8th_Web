import { useState } from "react"
import { MovieResponse } from "../types/movie"
import MovieCard from "../components/MovieCard"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useParams } from "react-router-dom"
import useCustomFetch from "../hooks/useCustomFetch"

export default function MoviePage() {
    const [page, setPage] = useState(1) // 페이지
    const { category } = useParams<{
        category: string;
    }>()
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`
    const {data: movies, isPending, isError} = useCustomFetch<MovieResponse>(url)

    if (isError) {
        return <div>
            <span className="text-red-500 text-2xl">에러가 발생했는데얔!!!!!!</span>
        </div>
    }

    if (!movies) return null

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
              <button 
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm
              hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-300 
              cursor-pointer disabled:cursor-not-allowed"
              disabled={page === 1}
               onClick={(): void => setPage((prev) => prev-1)}>
                {'<'}</button>
              <span>{page} 페이지</span>
              <button 
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-md
              hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                onClick={(): void => setPage((prev) => prev+1)}>
                {'>'}</button>
            </div>

            {isPending && 
              <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
              </div>}

            {!isPending && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                lg:grid-cols-5 xl:grid-cols-6">
                  {movies.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
            )} 
        </>  
    )
}