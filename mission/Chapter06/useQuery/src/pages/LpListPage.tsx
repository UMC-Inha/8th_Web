import { useGetLpList } from "../hooks/useGetLpList";
import { LpCard } from "../components/LpCard";
import { Lp } from "../types/lp";
import { useState } from "react";

const LpListPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { data, isPending, isError } = useGetLpList({
    cursor: 0,
    search: "",
    order,
    limit: 20,
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-end gap-2 mb-2 ">
        <button
          onClick={() => setOrder("desc")}
          className={`border px-4 py-2 rounded cursor-pointer hover:bg-zinc-200 active:bg-zinc-300 ${
            order == "desc" ? "border-blue-600" : "border-zinc-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder("asc")}
          className={`border px-4 py-2 rounded cursor-pointer hover:bg-zinc-200 active:bg-zinc-300 ${
            order == "asc" ? "border-blue-600" : "border-zinc-300"
          }`}
        >
          오래된순
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {data?.data.data.map((lp: Lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </div>
  );
};

export default LpListPage;
