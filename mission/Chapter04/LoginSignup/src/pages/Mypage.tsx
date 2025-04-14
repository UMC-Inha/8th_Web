import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const Mypage = () => {
  const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await getMyInfo();
        setUser(res.data);
      } catch (err) {
        console.error("내 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>유저 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black gap-2">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <p>🙋 이름: {user.name}</p>
      <p>📧 이메일: {user.email}</p>
      <p>📅 가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Mypage;
