import { useState, useEffect } from "react"
import axios from "axios"
import { Movie, MovieResponse } from "../types/movie"
import MovieCard from "../components/MovieCard"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useParams } from "react-router-dom"


export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([])
   
    const [isPending,setIsPending] = useState(false)  // 로딩상태
    const [isError, setIsError] = useState(false) // 에러상태
    const [page, setPage] = useState(1) // 페이지

    const { category } = useParams<{
        category: string;
    }>()

    useEffect((): void => {
        const fetchMovies = async(): Promise<void> => {
            setIsPending(true);
        const apiKey = import.meta.env.VITE_TMDB_KEY
            try { 
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}&api_key=${apiKey}`,  
                )
                
                setMovies(data.results)
            } catch {
                setIsError(true)
            } finally {
                setIsPending(false)
            }
        }
        
        fetchMovies()
    }, [page, category])

    if (isError) {
        return <div>
            <span className="text-red-500 text-2xl">에러가 발생했는데얔!!!!!!</span>
        </div>
    }

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
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
            )} 
        </>  
    )
}