import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "./types/movie";
import { Url } from "./types/url"; // Url 타입 가져오기
import axios from "axios";

// Movie 타입과 URL을 받아오는 MoviesPage 컴포넌트
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 리스트 상태
  const [url, setUrl] = useState<Url | null>(null); // URL 정보 상태 (null로 초기화)

  // 영화 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      console.log("Movie Data:", data.results[0]);
      setMovies(data.results); // 영화 데이터 저장
    };

    fetchMovies();
  }, []); // 컴포넌트 마운트 시 영화 데이터를 불러옴

  // URL 설정 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchUrl = async () => {
      const { data } = await axios.get<{ images: Url }>(
        `https://api.themoviedb.org/3/configuration`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      console.log("URL Data:", data.images);
      setUrl(data.images); // URL 데이터 저장
    };

    fetchUrl();
  }, []); // 컴포넌트 마운트 시 URL 설정을 불러옴

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className="relative group rounded-lg overflow-hidden shadow-lg"
        >
          {url ? (
            <img
              src={`${url.secure_base_url}${url.poster_sizes[4]}/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition duration-300 ease-in-out transform group-hover:blur-sm"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"> Loading </div>
          )}

          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out p-10">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold">{movie.title}</h3>
              <p className="mt-2 text-sm line-clamp-4">{movie.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;
