import { useFetch } from "./useFetch";
import { MovieResponse } from "../types/movie";

export const useFetchMovies = (
  type: "popular" | "upcoming" | "top_rated" | "now_playing",
  page: number
) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?language=ko-KR&page=${page}`;
  const { data, loading, error } = useFetch<MovieResponse>(url, [type, page]);

  return {
    movies: data?.results || [],
    loading,
    error,
  };
};
