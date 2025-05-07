import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { Lp } from "../types/lp";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex justify-center items-start py-10">
      <div className="bg-gray text-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-3 py-2 rounded text-white bg-blue-900 hover:bg-zinc-600 transition flex items-center gap-2"
        >
          <ArrowLeft className="w- h-6" />
          <span className="text-base">뒤로가기</span>
        </button>
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
        <p className="text-sm text-zinc-400 mb-4">
          작성일: {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="mb-6">{lp.content}</p>
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded">수정</button>
          <button className="border px-4 py-2 rounded">삭제</button>
          <button className="border px-4 py-2 rounded">❤️ 좋아요</button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
