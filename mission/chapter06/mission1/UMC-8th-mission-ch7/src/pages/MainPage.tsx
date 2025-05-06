import { useLpList } from "../hooks/useLPList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LP } from "../types/lp";

const MainPage = () => {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const { data, isLoading } = useLpList(sort);
  const navigate = useNavigate();

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1>돌려돌려 LP판!</h1>
        <div>
          <button onClick={() => setSort("latest")}>최신순</button>
          <button onClick={() => setSort("oldest")}>오래된순</button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4 p-4">
        {data?.data?.map((lp: LP) => (
          <div
            key={lp.id}
            className="relative bg-white shadow-md hover:scale-105 transition-transform duration-200"
            onClick={() => navigate(`/lp/${lp.id}`)}
          >
            <img src={lp.coverImage} alt={lp.title} className="w-full" />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 text-white p-2 flex flex-col justify-end transition-opacity">
              <p>{lp.title}</p>
              <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p>❤️ {lp.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
