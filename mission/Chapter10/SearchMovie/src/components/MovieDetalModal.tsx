import React from "react";
import type { Movie } from "../types/movie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const backdropBaseUrl = "https://image.tmdb.org/t/p/original";

const MovieDetailModal: React.FC<Props> = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[95%] max-w-5xl overflow-hidden relative">
        <div
          className="h-40 md:h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${backdropBaseUrl}${movie.backdrop_path})`
              : "none",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
              {movie.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              {movie.original_title}
            </p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-200"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="p-6 md:flex md:gap-6">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : "/no-image.jpg"
            }
            alt={movie.title}
            className="w-40 md:w-48 rounded-md shadow-md mx-auto md:mx-0 mb-4 md:mb-0"
          />

          <div className="flex-1 space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
              {movie.vote_average.toFixed(1)}
              <span className="text-sm text-gray-500 font-normal">
                ({movie.vote_count} 평가)
              </span>
            </div>

            <p>
              <strong>개봉일:</strong> {movie.release_date}
            </p>
            <p>
              <strong>인기도:</strong> {movie.popularity}
            </p>
            <p>
              <strong>성인 영화 여부:</strong>{" "}
              {movie.adult ? "성인" : "전체 관람가"}
            </p>

            <hr className="my-3" />

            <div>
              <p className="text-base font-bold mb-1">줄거리</p>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100"
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

export default MovieDetailModal;
