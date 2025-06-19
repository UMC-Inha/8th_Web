import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("ko-KR");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(
      `/movies/search?query=${encodeURIComponent(query)}&language=${language}`
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-2 items-center mb-6 w-full sm:w-[300px]">
        <input
          type="text"
          placeholder="🎬 영화 제목을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        >
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded shadow w-full"
        >
          🔍 검색하기
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
