import { Movie } from "../types/movie";
import React from "react";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div
          className="h-56 bg-cover bg-center"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
              : "none",
          }}
        ></div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded"
          />

          <div className="col-span-2 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              개봉일: {movie.release_date} | 평점:{" "}
              {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>
            <p className="text-sm text-gray-800 mb-6">
              {movie.overview || "줄거리 없음"}
            </p>

            <div className="flex gap-4 justify-end mt-auto">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
