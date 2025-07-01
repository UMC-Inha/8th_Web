import { useState, useCallback, ReactElement } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { Movie } from "../types/movie";

export default function MovieSearchPage(): ReactElement {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('ko-KR');
  const [showAdult, setShowAdult] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { movies, loading, error, searchMovies } = useSearchMovies();

  const handleSearch = useCallback(() => {
    searchMovies(query, language, showAdult);
  }, [query, language, showAdult, searchMovies]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 검색 UI */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목을 입력하세요"
          className="border px-4 py-2 rounded w-64"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showAdult}
            onChange={(e) => setShowAdult(e.target.checked)}
          />
          성인 콘텐츠 표시
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          🔍 검색하기
        </button>
      </div>

      {/* 결과 */}
      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}