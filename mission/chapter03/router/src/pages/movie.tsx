import { useState } from "react";
import MovieCard from "../component/MovieCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";
import useAxios from "../custom-hook/useAxios";

const MoviesPage = () => {
  const params = useParams();
  const [page, setPage] = useState(1);

  const { response, loading, error } = useAxios({
    method: "GET",
    url: `/${params.type}?language=en-US&page=${page}`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    }
  }, [params, page]);

  const movies = response?.data.results;

  if (error) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>
          에러가 발생했습니다.
        </span>
      </div>
    )
  }
  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className='bg-purple-400 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-gray-300 transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed'
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}>
          {`<`}
        </button>
        <span>{page}페이지</span>
        <button
          className='bg-purple-400 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-gray-300 transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed'
          onClick={() => setPage(prev => prev + 1)}>
          {`>`}
        </button>
      </div>

      {loading && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!loading &&
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      }
    </>
  );
}

export default MoviesPage