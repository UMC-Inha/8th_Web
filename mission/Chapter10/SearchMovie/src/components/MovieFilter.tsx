import { memo, useState } from "react";
import { Input } from "./Input.tsx";
import { SelectBox } from "./SelectBox.tsx";
import { LanguageSelector } from "./LanguageSelector.tsx";
import { LANGUAGE_OPTIONS } from "../constants/movie.ts";
import type { MovieFilters } from "../types/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <div>
      <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>
        <div>
          <div className="flex gap-x-4">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                옵션
              </label>
              <SelectBox
                checked={includeAdult}
                onChange={setIncludeAdult}
                label="성인 콘텐츠 표시"
                id="include_adult"
                className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                언어
              </label>
              <LanguageSelector
                value={language}
                onChange={setLanguage}
                options={LANGUAGE_OPTIONS}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            className="w-full p-2 rounded-xl bg-blue-400 focus:ring-2 focus:bg-gray-500"
          >
            영화 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
