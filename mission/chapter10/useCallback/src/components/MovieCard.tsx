import { useState } from "react";
import type { Movie } from "../types/movies";
import MovieDetailModal from "./MovieDetailModal";

interface MovieCardProps {
    movie: Movie;
}
export const MovieCard = ({ movie }: MovieCardProps) => {
    const ImageBaseUrl = "https://image.tmdb.org/t/p/w500"; // 이미지
    const fallbackImageUrl = "https://placehold.co/600x400"; // 이미지가 없다면

    const [isModalOpen, setIsModalOpen] = useState(false); // 상세정보모달

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="overflow-hidden rounded-lg bg-white shadow-md
    transition-all hover:shadow-lg hover:bg-gray-200 cursor-pointer"
            >
                <div className="overflow-hidden relative h-80">
                    <img
                        src={
                            movie.poster_path
                                ? `${ImageBaseUrl}${movie.poster_path}`
                                : `${fallbackImageUrl}`
                        }
                        alt={`${movie.title} 포스터`}
                        className="h-full w-full object-cover transition-transform
          duration-300 ease-in-out hover:scale-105"
                    />
                    <div
                        className="absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1
        text-sm font-bold text-white"
                    >
                        {movie.vote_average.toFixed(1)}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold text-gray-800">
                        {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {movie.release_date} | {movie.original_language.toUpperCase()}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                        {movie.overview.length > 50
                            ? `${movie.overview.slice(0, 50)}...`
                            : movie.overview}
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <MovieDetailModal movie={movie}
                    onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default MovieCard;