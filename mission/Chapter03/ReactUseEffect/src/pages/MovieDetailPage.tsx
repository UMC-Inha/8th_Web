import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../types/movie";
import type {
  BackdropImage,
  CastMember,
  CreditsResponse,
} from "../types/movie";

const TOKEN = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [tab, setTab] = useState<"info" | "credits">("info");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [movieRes, creditsRes, imagesRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: { Authorization: TOKEN },
            }
          ),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            { headers: { Authorization: TOKEN } }
          ),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
            headers: { Authorization: TOKEN },
          }),
        ]);

        setMovie(movieRes.data);

        const dir =
          creditsRes.data.crew.find((c) => c.job === "Director")?.name || "";
        setDirector(dir);
        setCast(creditsRes.data.cast.slice(0, 8)); // 배우 8명까지만

        setImages(
          imagesRes.data.backdrops.map(
            (b: BackdropImage) =>
              `https://image.tmdb.org/t/p/w780${b.file_path}`
          )
        );
      } catch (err) {
        console.error("에러:", err);
      }
    };

    fetchAll();
  }, [movieId]);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-48 bg-gray-900">
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

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
          <p className="text-lg font-semibold mb-4">🎬 감독: {director}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="text-center border p-2 rounded shadow bg-white dark:bg-gray-800"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                  className="rounded w-full h-[278px] object-cover"
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
