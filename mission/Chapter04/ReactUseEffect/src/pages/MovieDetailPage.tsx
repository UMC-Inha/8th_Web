import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Movie, BackdropImage, CreditsResponse } from "../types/movie";
import { useFetch } from "../hooks/useFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  // useFetch로 3개의 요청을 각각 처리
  const {
    data: movie,
    loading: loadingMovie,
    error: errorMovie,
  } = useFetch<Movie>(`/movie/${movieId}?language=ko-KR`);

  const {
    data: credits,
    loading: loadingCredits,
    error: errorCredits,
  } = useFetch<CreditsResponse>(`/movie/${movieId}/credits`);

  const {
    data: imageData,
    loading: loadingImages,
    error: errorImages,
  } = useFetch<{ backdrops: BackdropImage[] }>(`/movie/${movieId}/images`);

  const loading = loadingMovie || loadingCredits || loadingImages;
  const error = errorMovie || errorCredits || errorImages;

  const [tab, setTab] = useState<"info" | "credits">("info");

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-gray-900">
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ 데이터를 불러오는 중 오류가 발생했습니다:
        <br />
        {error}
      </div>
    );
  }

  const directorObj = credits?.crew.find((c) => c.job === "Director");
  const director = directorObj?.name || "";
  const directorProfile = directorObj?.profile_path || null;
  const cast = credits?.cast.slice(0, 12) || [];

  const images =
    imageData?.backdrops.map(
      (b) => `https://image.tmdb.org/t/p/w780${b.file_path}`
    ) || [];

  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 이미지 슬라이더 */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
      >
        {images.slice(0, 5).map((url, i) => (
          <SwiperSlide key={i}>
            <img src={url} alt="backdrop" className="rounded-lg w-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 제목 + 탭 */}
      <h1 className="text-3xl font-bold mt-6 text-blue-600">{movie.title}</h1>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setTab("info")}
          className={`px-4 py-2 rounded ${
            tab === "info" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          영화 정보
        </button>
        <button
          onClick={() => setTab("credits")}
          className={`px-4 py-2 rounded ${
            tab === "credits" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          출연/감독
        </button>
      </div>

      {/* 정보 탭 */}
      {tab === "info" && (
        <div className="mt-4">
          <p className="text-gray-800 dark:text-white">{movie.overview}</p>
          <p className="mt-2">📅 개봉일: {movie.release_date}</p>
          <p>⭐ 평점: {movie.vote_average}</p>
        </div>
      )}

      {/* 출연진 탭 */}
      {tab === "credits" && (
        <div className="mt-6">
          {/* 감독 */}
          <div className="flex items-center gap-4 mb-10">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 flex justify-center items-center text-yellow-400 text-5xl select-none">
                ⭐
              </div>
              <img
                src={
                  directorProfile
                    ? `https://image.tmdb.org/t/p/w185${directorProfile}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt=""
                className="rounded-full border-4 border-yellow-400 object-cover w-28 h-28 z-10 relative"
              />
            </div>
            <div>
              <p className="text-xl font-bold">감독</p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {director}
              </p>
            </div>
          </div>

          {/* 출연진 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="text-center border p-2 rounded shadow bg-white dark:bg-gray-800 flex flex-col items-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt=""
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-300"
                />
                <h3 className="mt-2 font-bold">{actor.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  "{actor.character}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
