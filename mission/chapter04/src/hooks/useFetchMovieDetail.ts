import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetail, CreditResponse } from "../types/movie";

export const useFetchMovieDetail = (movieId?: string) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const movieRes = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovie(movieRes.data);

        const creditsRes = await axios.get<CreditResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setCredits(creditsRes.data);
      } catch (e) {
        setError("영화 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchDetails();
  }, [movieId]);

  return { movie, credits, loading, error };
};
