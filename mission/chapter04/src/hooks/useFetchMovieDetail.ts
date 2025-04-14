import { useFetch } from "./useFetch";
import { MovieDetail, CreditResponse } from "../types/movie";

export const useFetchMovieDetail = (movieId?: string) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const {
    data: movie,
    loading: loadingMovie,
    error: movieError,
  } = useFetch<MovieDetail>(movieUrl, [movieId]);

  const {
    data: credits,
    loading: loadingCredits,
    error: creditsError,
  } = useFetch<CreditResponse>(creditUrl, [movieId]);

  return {
    movie,
    credits,
    loading: loadingMovie || loadingCredits,
    error: movieError || creditsError,
  };
};
