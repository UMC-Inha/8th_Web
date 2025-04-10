import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";

export const useFetchMovies = (
  type: "popular" | "upcoming" | "top_rated" | "now_playing",
  page: number
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${type}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch (err) {
        setError("에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [type, page]);

  return { movies, loading, error };
};
