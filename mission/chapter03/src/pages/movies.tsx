import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";

type Props = {
  type: "popular" | "upcoming" | "top_rated" | "now_playing";
};

const MovieListPage = ({ type }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${type}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjRjYjZhNDA4YzczMjFiYjY0M2UyMWIxY2E3ZjgzNyIsIm5iZiI6MTcxNzM0MzE2MS4xNTI5OTk5LCJzdWIiOiI2NjVjOTNiOWUyZDcwNDRiYjU0ODE1Y2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cNpVb-vueqHhSTgKADh14WcwQLTwkPaceQvsULUtcSU`,
          },
        }
      );
      setMovies(data.results);
    } catch (err) {
      setError("에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [type, page]);

  // 스피너
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    // 페이지네이션
    <div className="space-y-6">
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded shadow ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#8a8cff] text-white"
          }`}
        >
          &lt; 이전
        </button>

        <span className="text-sm font-medium">페이지 {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#8a8cff] text-white rounded shadow"
        >
          다음 &gt;
        </button>
      </div>

      {/* 영화 리스트 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* 포스터 이미지 */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover transition duration-300 group-hover:blur-sm"
            />

            {/* 블러 처리 후 텍스트 */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-2 text-white text-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-sm font-bold mb-2">{movie.title}</h2>
              <p className="text-xs p-2 rounded">
                {movie.overview.slice(0, 80)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;
