import { ReactElement } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetail, Cast } from "../types/movieDetails";

const MovieDetailPage = (): ReactElement => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Cast[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const fetchMovieData = async (): Promise<void> => {
        setIsLoading(true);
        setIsError(false);
        try {
          const [detailRes, creditsRes] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
              params: { language: "ko-KR" },
            }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
              params: { language: "ko-KR" },
            }),
          ]);
  
          setMovie(detailRes.data);
          setCredits(creditsRes.data.cast);
        } catch (error) {
          console.log(error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchMovieData();
    }, [movieId]);
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (isError || !movie) {
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
            <p className="text-gray-300 mt-2 text-left">{movie.release_date} · {movie.runtime}분</p>
            <p className="text-xl italic mt-4 text-left">{movie.tagline}</p>
            <p className="text-sm mt-4 leading-relaxed max-w-3xl text-left">{movie.overview}</p>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-8 py-10">
          <h2 className="text-2xl font-bold mb-6 text-left">감독/출연</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-6">
            {credits.map((cast) => (
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