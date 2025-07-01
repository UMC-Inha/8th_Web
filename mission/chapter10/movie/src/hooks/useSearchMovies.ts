import { useState, useCallback } from "react";
import axios from "axios";
import { Movie } from "../types/movie";

export function useSearchMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = useCallback(
    async (query: string, language: string = "ko-KR", includeAdult: boolean = false) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              query,
              language,
              include_adult: includeAdult,
            },
          }
        );
        setMovies(res.data.results);
      } catch (e) {
        setError("검색 중 오류 발생");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { movies, loading, error, searchMovies };
}
