import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Movie } from "../types/movie";
import axios from "axios";
import Search from "../components/Search";
import MovieModal from "../components/MovieModal";
import React from "react";

const MovieCard = React.memo(
  ({ movie, onClick }: { movie: Movie; onClick: (movie: Movie) => void }) => {
    return (
      <div
        onClick={() => onClick(movie)}
        className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[300px] object-cover transition duration-300 group-hover:blur-sm"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-2 text-white text-center opacity-0 group-hover:opacity-100 transition duration-300">
          <h2 className="text-sm font-bold mb-2">{movie.title}</h2>
          <p className="text-xs p-2 rounded">
            {movie.overview?.slice(0, 80) || "설명 없음"}...
          </p>
        </div>
      </div>
    );
  }
);

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const language = params.get("language") || "ko-KR";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleOpenModal = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);
  const handleCloseModal = () => setSelectedMovie(null);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=${language}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(res.data.results);
      } catch {
        setError("검색 결과를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query, language]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <Search>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={handleOpenModal} />
        ))}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </Search>
  );
};

export default SearchPage;
