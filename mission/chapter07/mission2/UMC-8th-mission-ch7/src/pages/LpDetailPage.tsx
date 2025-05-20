import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { LpDetailDto } from "../types/lp";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import LpComments from "../components/LpComment/LpComments";
import { useAddLike } from "../hooks/mutations/useAddLike";
import { useRemoveLike } from "../hooks/mutations/useRemoveLike";

const LpDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const lpId = Number(id);
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

  // 모든 훅은 조건문 바깥에서 호출
  const { data: lp, isLoading, isError } = useQuery<LpDetailDto>({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId && !!accessToken,
  });

  const addLikeMutation = useAddLike(lpId);
  const removeLikeMutation = useRemoveLike(lpId);

  // 로그인 안 되어 있으면 로그인 유도
  if (!accessToken || !user) {
    if (window.confirm("로그인이 필요한 서비스입니다.\n로그인하시겠습니까?")) {
      navigate("/login");
    }
    return null;
  }

  if (isLoading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="mt-20 text-center">조회된 LP가 없습니다.</div>;
  }

  // 현재 사용자가 좋아요를 눌렀는지 여부
  const isLiked = lp.likes.some((l) => l.userId === user.id);

  const handleLike = () => {
    if (isLiked) {
      removeLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{lp.title}</h1>

      {lp.thumbnail && (
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover rounded-full shadow-lg animate-spin [animation-duration:20s] [animation-timing-function:linear]"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-600" />
            </div>
          </div>
        </div>
      )}

      <p className="prose mb-6">{lp.content}</p>

      <div className="mb-4">
        {lp.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-block px-2 py-1 mr-2 mb-2 bg-gray-200 dark:bg-gray-700 rounded text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500 mb-6 text-center">
        작성자: {lp.author.name} · 좋아요 {lp.likes.length} ·{" "}
        {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
          <FaEdit className="mr-2" /> 수정
        </button>
        <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100">
          <FaTrash className="mr-2" /> 삭제
        </button>
        <button
          onClick={handleLike}
          className={`flex items-center px-4 py-2 border rounded ${
            isLiked ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
          }`}
        >
          <FaHeart className="mr-2" />
          {isLiked ? "좋아요 취소" : "좋아요"}
        </button>
      </div>

      <LpComments lpId={lpId} limit={10} />
    </div>
  );
};

export default LpDetailPage;
