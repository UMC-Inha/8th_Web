import { useState } from "react";
import { Movie } from "../types/movie"
import MovieCard from "./MovieCard";
import MovieInformationModal from "./MovieInformationModal";

interface MovieListProps {
    movies : Movie[];
}

const MovieList = ({movies} : MovieListProps) => {
    const [clickMovie, setClickMovie] = useState<Movie | null>(null);

    if(movies.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">
                    검색 결과가 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {movies.map((movie) => (
                    <MovieCard key = {movie.id} movie = {movie} onClick={() => setClickMovie(movie)} />
                ))}
            </div>

            {clickMovie && (
                <MovieInformationModal movie={clickMovie} onClose={() => setClickMovie(null)} />
            )}
        </div>
    )
}

export default MovieList
