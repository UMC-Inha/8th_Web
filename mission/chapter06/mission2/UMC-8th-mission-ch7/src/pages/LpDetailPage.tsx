import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Lp } from "../types/lp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const fetchLpDetail = async (id: string) => {
  const response = await axios.get<Lp>(`/v1/lps/${id}`);
  return response.data;
};

const likeLp = async (id: number) => {
  const res = await axios.post(`/v1/lps/${id}/like`);
  return res.data;
};

const deleteLp = async (id: number) => {
  const res = await axios.delete(`/v1/lps/${id}`);
  return res.data;
};

const LpDetailPage = () => {
  const { LPid } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lp", LPid],
    queryFn: () => fetchLpDetail(LPid!),
    enabled: !!LPid,
  });

  const likeMutation = useMutation({
    mutationFn: () => likeLp(data!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lp", LPid] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLp(data!.id),
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/");
    },
  });

  if (isLoading) return <div className="text-white mt-20">로딩 중...</div>;
  if (isError || !data) return <div className="text-red-500 mt-20">오류 발생</div>;

  return (
    <div className="mt-20 px-6 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
        <div className="flex gap-3">
          <button className="text-gray-400 hover:text-white" title="수정">✏️</button>
          <button
            className="text-gray-400 hover:text-white"
            title="삭제"
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) deleteMutation.mutate();
            }}
            disabled={deleting}
          >
            🗑️
          </button>
        </div>
      </div>

      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-[300px] h-[300px] object-cover mb-4 rounded"
      />
      <p className="text-gray-300 mb-2">{data.content}</p>
      <div className="flex gap-2 flex-wrap">
        {data.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full"
          >
            #{tag.name}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <button
          onClick={() => likeMutation.mutate()}
          className="hover:text-pink-500"
        >
          ♥ 좋아요
        </button>
        <span>| {data.likes.length}</span>
        <span>| {new Date(data.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default LpDetailPage;
