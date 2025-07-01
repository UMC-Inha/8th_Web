import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetail, Cast } from "../types/movieDetails";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = (): ReactElement => {
  const { movieId } = useParams();

  const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const {
    data: movie,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useCustomFetch<MovieDetail>(detailUrl, "ko-KR");

  const {
    data: credits,
    isPending: isCreditsPending,
    isError: isCreditsError,
  } = useCustomFetch<{ cast: Cast[] }>(creditsUrl, "ko-KR");

  const isPending = isDetailPending || isCreditsPending;
  const isError = isDetailError || isCreditsError;

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie || !credits) {
    return <div className="text-red-500 text-xl">에러가 발생했습니당ㅜㅜ</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="relative h-[500px] bg-cover bg-center flex items-end p-8"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-4xl font-bold text-left">{movie.title}</h1>
          <p className="text-gray-300 mt-2 text-left">
            {movie.release_date} · {movie.runtime}분
          </p>
          <p className="text-xl italic mt-4 text-left">{movie.tagline}</p>
          <p className="text-sm mt-4 leading-relaxed max-w-3xl text-left">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 text-left">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-6">
          {credits.cast.map((cast: Cast) => (
            <div key={cast.id} className="flex flex-col items-center text-center">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                    : `https://via.placeholder.com/200x300?text=No+Image`
                }
                alt={cast.name}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
              <p className="mt-2 font-semibold">{cast.name}</p>
              <p className="text-sm text-gray-400">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
