import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MovieResponse } from "../types/movie";

const API_BASE = "https://api.themoviedb.org/3/movie";

interface MoviesPageProps {
  category: string;
}

const MoviesPage: React.FC<MoviesPageProps> = ({ category }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const url = `${API_BASE}/${category}?language=ko-KR&page=${page}`;
  const { data, loading, error } = useFetch<MovieResponse>(url);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  if (loading)
    return (
      <p>
        {" "}
        <div className="flex justify-center items-center h-48 bg-gray-900">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* 영화 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.results.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer shadow-md hover:scale-105 transition"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t"
            />
            <div className="p-2 bg-white dark:bg-gray-800">
              <h2 className="font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {movie.vote_average}점
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          &lt;
        </button>
        <span className="text-gray-700 dark:text-white font-semibold">
          {page} 페이지
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-purple-400 text-white rounded"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
