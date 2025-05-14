import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { Lp } from "../types/lp";
import { Sidebar } from "../components/Sidebar";
import { LpCommentsPage } from "./LpCommentsPage";

export const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(Number(lpId)),
    enabled: !!lpId,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  const lp: Lp = data;

  return (
    <div className="flex">
      <div className="w-[200px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-2 p-4">
        <h1 className="text-3xl font-bold mb-4">{lp.title}</h1>

        <div className="relative flex items-center justify-center">
          {/* {Lp판} */}
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-96 h-96 rounded-full object-cover shadow-lg
            animate-spin [animation-duration:10s] [animation-timing-function:linear]"
          />
          {/* {Lp판 중앙구멍} */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className="w-12 h-12 bg-gray-100 rounded-full shadow-lg
            border-2 border-gray-300"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold">{lp.title}</h2>
          <p className="text-sm mt-2">{lp.content}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600">
            Edit
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600">
            Delete
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600">
            ❤️ {lp.likes.length}
          </button>
        </div>
        <LpCommentsPage />
      </div>
    </div>
  );
};
