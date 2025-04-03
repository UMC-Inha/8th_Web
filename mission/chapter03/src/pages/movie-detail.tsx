import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MovieDetail, CreditResponse } from "../types/movie";
import "../styles/movie-detail.css";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const movieResponse = await axios.get<MovieDetail>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjRjYjZhNDA4YzczMjFiYjY0M2UyMWIxY2E3ZjgzNyIsIm5iZiI6MTcxNzM0MzE2MS4xNTI5OTk5LCJzdWIiOiI2NjVjOTNiOWUyZDcwNDRiYjU0ODE1Y2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cNpVb-vueqHhSTgKADh14WcwQLTwkPaceQvsULUtcSU`, // 실제 API 키로 교체
          },
        }
      );
      setMovie(movieResponse.data);

      console.log("Movie Data:", movieResponse.data);

      const creditsResponse = await axios.get<CreditResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjRjYjZhNDA4YzczMjFiYjY0M2UyMWIxY2E3ZjgzNyIsIm5iZiI6MTcxNzM0MzE2MS4xNTI5OTk5LCJzdWIiOiI2NjVjOTNiOWUyZDcwNDRiYjU0ODE1Y2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cNpVb-vueqHhSTgKADh14WcwQLTwkPaceQvsULUtcSU`, // 실제 API 키로 교체
          },
        }
      );
      setCredits(creditsResponse.data);
    } catch (err) {
      setError("영화 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-detail-container">
      <div
        className="movie-header"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
        }}
      >
        <h1>{movie?.title}</h1>
        <div>
          {movie?.release_date.slice(0, 4)} | 평점:{" "}
          {movie?.vote_average.toFixed(1)}
        </div>
        <div>러닝타임: {movie?.runtime}분</div>
        <div>{movie?.tagline}</div>
        <div>{movie?.overview}</div>
      </div>

      <div className="credits">
        <h2 className="credits-heading">감독/출연</h2>
        <div className="directors">
          <h3 className="sub-heading">감독</h3>
          <div>
            {credits?.crew
              .filter((person) => person.job === "Director")
              .map((director) => (
                <div key={director.id} className="person">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                    alt={director.name}
                    className="person-img"
                  />
                  <div className="person-name">{director.name}</div>
                  <div className="person-role">{director.job}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="cast">
          <h3 className="sub-heading">출연진</h3>
          <div className="cast-grid">
            {credits?.cast.map((actor) => (
              <div key={actor.id} className="person">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="person-img"
                />
                <div className="person-name">{actor.name}</div>
                <div className="person-role">{actor.character}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
