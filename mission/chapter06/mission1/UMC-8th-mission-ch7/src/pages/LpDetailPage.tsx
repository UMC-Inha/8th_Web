import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

interface LpDetail {
  id: number;
  title: string;
  description: string;
  coverImage: string;
}

const LpDetailPage = () => {
  const { LPid } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const { data, isLoading } = useQuery<{ data: LpDetail }>({
    queryKey: ["lpDetail", LPid],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/v1/lps/${LPid}`);
      return res.data;
    },
    enabled: !!LPid, // LPid가 존재할 때만 실행
  });

  if (isLoading) return <p>로딩 중...</p>;

  if (!data) return <p>데이터 없음</p>;

  return (
    <div className="p-4">
      <h1>{data.data.title}</h1>
      <img src={data.data.coverImage} alt={data.data.title} />
      <p>{data.data.description}</p>
      <button>수정</button>
      <button>삭제</button>
      <button>좋아요</button>
    </div>
  );
};

export default LpDetailPage;
