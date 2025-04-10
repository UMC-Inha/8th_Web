// src/pages/movie-detail.tsx
import { useParams } from "react-router-dom";
import { useFetchMovieDetail } from "../hooks/useFetchMovieDetail";
import "../styles/movie-detail.css";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { movie, credits, loading, error } = useFetchMovieDetail(movieId);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-detail-container">
      <div
        className="movie-header"
        style={{
          backgroundImage: movie?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
            : "none",
        }}
      >
        <h1>{movie?.title ?? "제목 없음"}</h1>
        <div>
          {movie?.release_date?.slice(0, 4) ?? "개봉년도 없음"} | 평점:{" "}
          {movie?.vote_average?.toFixed(1) ?? "N/A"}
        </div>
        <div>
          러닝타임: {movie?.runtime ? `${movie.runtime}분` : "정보 없음"}
        </div>
        <div>{movie?.tagline || "태그라인 정보 없음"}</div>
        <div>{movie?.overview || "줄거리 정보가 없음"}</div>
      </div>

      <div className="credits">
        <h2 className="credits-heading">감독/출연</h2>

        <div className="directors">
          <h3 className="sub-heading">감독</h3>
          <div>
            {credits?.crew?.filter((person) => person.job === "Director")
              .length ? (
              credits.crew
                .filter((person) => person.job === "Director")
                .map((director) => (
                  <div key={director.id} className="person">
                    <img
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                          : "/no-image.png"
                      }
                      alt={director.name}
                      className="person-img"
                    />
                    <div className="person-name">{director.name}</div>
                    <div className="person-role">{director.job}</div>
                  </div>
                ))
            ) : (
              <div>감독 정보 없음</div>
            )}
          </div>
        </div>

        <div className="cast">
          <h3 className="sub-heading">출연진</h3>
          <div className="cast-grid">
            {credits?.cast?.length ? (
              credits.cast.map((actor) => (
                <div key={actor.id} className="person">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "/no-image.png"
                    }
                    alt={actor.name}
                    className="person-img"
                  />
                  <div className="person-name">{actor.name}</div>
                  <div className="person-role">{actor.character}</div>
                </div>
              ))
            ) : (
              <div>출연진 정보 없음</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
