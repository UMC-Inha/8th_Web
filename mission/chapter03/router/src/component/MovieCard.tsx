import { useState } from "react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { id = '',
        poster_path = '',
        title = '',
        overview = ''
    } = movie;
    return (

        <Link to={`/movie/${id}`}>
            <div
                className='relative rounded-xl shadowing overflow-hidden cursor-pointer'
                onMouseEnter={(): void => setIsHovered(true)}
                onMouseLeave={(): void => setIsHovered(false)}
            >
                <img src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                    alt={`${title} 영화의 이미지`} />

                {isHovered && (
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 
                to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4'>
                        <h2 className='text-lg font-bold leading-snug'>{title}</h2>
                        <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{overview}</p>
                    </div>
                )}
            </div>
        </Link>
    );
}