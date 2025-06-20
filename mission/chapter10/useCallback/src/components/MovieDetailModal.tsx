import type { Movie } from "../types/movies";

interface MovieDetailModalProps {
    movie: Movie;
    onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
    const backdropImageUrl = "https://image.tmdb.org/t/p/original";
    const posterImageUrl = "https://image.tmdb.org/t/p/w500";
    const imdbInfoUrl = "https://www.imdb.com/find?q=";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-[700px] mx-4 rounded-xl overflow-hidden bg-white shadow-lg">
                <div className="relative h-48 sm:h-56 md:h-64 bg-black">
                    <img
                        src={`${backdropImageUrl}${movie.backdrop_path}`}
                        alt={movie.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-white text-xl font-bold 
            hover:text-blue-500 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 p-6">
                    <img
                        src={`${posterImageUrl}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-md shadow-md"
                    />

                    <div className="space-y-2">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
                            <p className="text-sm text-gray-600 italic">
                                {movie.original_title}
                            </p>
                        </div>

                        <div className="text-sm text-blue-600 font-semibold">
                            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} 평가)
                        </div>

                        <div className="text-sm text-gray-700">
                            <p>
                                📅 <strong>개봉일:</strong> {movie.release_date}
                            </p>
                            <p>
                                🔥 <strong>인기도:</strong> {movie.popularity}
                            </p>
                            <p>
                                📌 <strong>즐겨찾기 수:</strong> {movie.vote_count}
                            </p>
                        </div>

                        <div className="pt-2 text-sm text-gray-800 leading-relaxed">
                            {movie.overview || "줄거리 정보가 없습니다."}
                        </div>

                        <div className="pt-4 flex flex-wrap gap-3">
                            <a
                                href={`${imdbInfoUrl}${encodeURIComponent(movie.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                IMDb에서 검색
                            </a>
                            <button
                                onClick={onClose}
                                className="rounded border border-gray-400 px-4 py-2 
                text-gray-700 hover:bg-gray-100"
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