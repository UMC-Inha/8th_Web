import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white max-w-xl w-full p-6 rounded-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ❌
        </button>
        <div className="flex gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            className="w-36 h-auto rounded shadow"
            alt={movie.title}
          />
          <div>
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{movie.release_date}</p>
            <p className="text-sm">{movie.overview}</p>
            <p className="text-sm mt-3 text-yellow-600">평점: {movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
