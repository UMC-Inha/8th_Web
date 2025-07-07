import React, { useState, useCallback } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { Movie } from "../types/movie";
import Search from "../components/Search";
import MovieModal from "../components/MovieModal";

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
            {movie.overview.slice(0, 80)}...
          </p>
        </div>
      </div>
    );
  }
);

const MovieListPage = ({
  type,
}: {
  type: "popular" | "upcoming" | "top_rated" | "now_playing";
}) => {
  const [page, setPage] = useState(1);
  const { movies, loading, error } = useFetchMovies(type, page);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleOpenModal = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);
  const handleCloseModal = () => setSelectedMovie(null);

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
    <Search>
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
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

export default MovieListPage;
