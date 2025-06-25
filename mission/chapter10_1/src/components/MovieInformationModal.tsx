import { Movie } from "../types/movie";

interface MovieInformationModalProps {
    movie : Movie;
    onClose : () => void; 
}

const MovieInformationModal = ({movie, onClose} : MovieInformationModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImageImage = "http://via.placeholder.com/640x480";

    return (
        <div className="fixed inset-0 z-130 bg-opacity-70 bg-black flex items-center justify-center">
            <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}> ✕ </button>

                <div className="grid grid-rows-[auto_1fr] h-[90vh] max-w-10xl w-full bg-white rounded-lg overflow-hidden">
                    <div className="relative bg-cover bg-center h-64 bg-opacity-50" style={{backgroundImage: `url(${movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : fallbackImageImage})`, }}>
                        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-end p-6 text-white">
                            <h2 className="text-2xl font-bold"> {movie.title} </h2>
                            <p className="text-sm opacity-80"> {movie.original_title} </p>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="w-60 h-auto"
                        />

                        <div className="flex flex-col gap-2 items-center justify-center">
                            <div className="absolute right-133 top-72 rounded-md px-2 py-1"> 
                                <p className="text-md font-bold text-blue-500">
                                    {movie.vote_average}
                                </p>

                                <p className="text-sm text-gray-400">
                                    ({movie.vote_count} 평가)
                                </p>
                            </div>

                            <p className="text-l font-bold"> 개봉일 </p>
                            <p>  {movie.release_date} </p>

                            <p className="text-l font-bold"> 인기도 </p>
                            <div className="w-full bg-gray-200 rounded h-4">
                                <div
                                    className="h-4 bg-blue-500 rounded"
                                    style={{ width: `${movie.popularity}%` }}
                                />
                            </div>

                            <p className="text-l font-bold"> 줄거리 </p>
                            <p className="text-sm mt-2 text-gray-700">{movie.overview}</p>

                            <div className="flex gap-4 space-between">
                                <a
                                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                                target="_blank"
                                className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    IMDb에서 검색
                                </a>

                                <button className="mt-3  inline-block border border-blue-500 bg-white text-blue-500 px-4 py-2 rounded" onClick={onClose}> 닫기 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInformationModal
