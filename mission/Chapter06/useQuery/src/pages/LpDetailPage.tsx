import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { Lp } from "../types/lp";
import { ArrowLeft } from "lucide-react";
import { LpCommentsPage } from "./LpCommentsPage";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(Number(lpId)),
    enabled: !!lpId,
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError || !data) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  const lp: Lp = data.data;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-3 py-2 rounded text-white bg-blue-900 hover:bg-zinc-600 transition flex items-center gap-2"
      >
        <ArrowLeft className="w- h-6" />{" "}
      </button>
      <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
      <div className="text-sm text-zinc-400 mb-4 flex items-center gap-4 flex-wrap">
        <span>작성일: {new Date(lp.createdAt).toLocaleDateString()} </span>
        <span>좋아요: {lp.likes.length}개</span>
        <div className="flex items-center gap-2 flex-wrap">
          태그:
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-800 text-white px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <div className="w-full aspect-square relative mb-6">
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg border-4 border-black">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full z-10" />
        </div>
        <p className="text-gray-300 italic text-ml mb-4">{lp.content}</p>

        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded">수정</button>{" "}
          <button className="border px-4 py-2 rounded">삭제</button>{" "}
          <button className="border px-4 py-2 rounded">❤️ 좋아요</button>{" "}
        </div>

        <LpCommentsPage />
      </div>
    </div>
  );
};

export default LpDetailPage;
