import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const { data, isPending, isError } = useGetLpList({
      cursor: 0,
      limit: 40,
      search: "",
      order,
    });
  
    const { accessToken } = useAuth();

  if (isPending) return <div className="text-center mt-10">로딩 중...</div>;
  if (isError) return <div className="text-center mt-10 text-red-400">데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="px-6 py-4">
      <div className="flex justify-end mb-4 gap-2">
        <button
          className={`px-4 py-2 rounded ${order === "asc" ? "bg-gray-600 text-white" : "bg-white text-black"}`}
          onClick={() => setOrder("asc")}
        >
          오래된순
        </button>
        <button
          className={`px-4 py-2 rounded ${order === "desc" ? "bg-gray-600 text-white" : "bg-white text-black"}`}
          onClick={() => setOrder("desc")}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {data.map((lp) => (
    <LpCard key={lp.id} lp={lp} isLoggedIn={!!accessToken} />
  ))}
</div>
    </div>
  );
};

export default HomePage;
