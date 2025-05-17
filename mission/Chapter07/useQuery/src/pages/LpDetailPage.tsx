import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getLpById as getLpByIdApi,
  updateLpById as updateLpByIdApi,
  deleteLpById as deleteLpByIdApi,
} from "../apis/lp";
import { Lp } from "../types/lp";
import { ArrowLeft } from "lucide-react";
import { LpCommentsPage } from "./LpCommentsPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateLpModal } from "../components/UpdateLpMdal";
import { useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import {
  postLike as postLikeApi,
  deleteLike as deleteLikeApi,
} from "../apis/like";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const me = queryClient.getQueryData<ResponseMyInfoDto>(["me"]);
  const myUserId = me?.data.id;

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deleteLpByIdApi(Number(lpId)),
    onSuccess: () => {
      alert("삭제 완료!");
      navigate("/lps");
    },
  });

  const { mutate: handleUpdate } = useMutation({
    mutationFn: (form: {
      title: string;
      content: string;
      thumbnail: string | File;
      tags: string[];
    }) => updateLpByIdApi(Number(lpId), form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
      setIsEditModalOpen(false);
      alert("수정 완료!");
    },
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () =>
      hasLiked ? deleteLikeApi(Number(lpId)) : postLikeApi(Number(lpId)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });
      const previous = queryClient.getQueryData<{ data: Lp }>([
        "lpDetail",
        lpId,
      ]);
      if (!previous || !myUserId) return;

      const alreadyLiked = previous.data.likes.some(
        (l) => l.userId === myUserId
      );

      const newLikes = alreadyLiked
        ? previous.data.likes.filter((l) => l.userId !== myUserId)
        : [...previous.data.likes, { userId: myUserId, id: Date.now() }];

      queryClient.setQueryData(["lpDetail", lpId], {
        ...previous,
        data: {
          ...previous.data,
          likes: newLikes,
        },
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["lpDetail", lpId], context.previous);
      }
      alert("좋아요 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpByIdApi(Number(lpId)),
    enabled: !!lpId,
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError || !data) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  const lp: Lp = data.data;
  const hasLiked = lp.likes.some((l) => l.userId === myUserId);

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
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg border-4 border-black bg-gradient-to-br from-zinc-900 to-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full overflow-hidden z-10 border-4 border-white">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="text-gray-300 italic text-ml mb-4">{lp.content}</p>

        <div className="flex gap-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="border px-4 py-2 rounded"
          >
            수정
          </button>
          <button
            onClick={() => {
              const ok = confirm("정말 삭제하시겠습니까?");
              if (ok) handleDelete();
            }}
            className="border px-4 py-2 rounded text-red-400"
          >
            삭제
          </button>
          <button
            onClick={() => toggleLike()}
            className="border px-4 py-2 rounded"
          >
            {hasLiked ? "💔 좋아요 취소" : "❤️ 좋아요"}
          </button>
        </div>

        <LpCommentsPage />
        {isEditModalOpen && (
          <UpdateLpModal
            initialData={{
              title: lp.title,
              content: lp.content,
              thumbnail: lp.thumbnail,
              tags: lp.tags.map((t) => t.name),
            }}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={(formData) => handleUpdate(formData)}
          />
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
