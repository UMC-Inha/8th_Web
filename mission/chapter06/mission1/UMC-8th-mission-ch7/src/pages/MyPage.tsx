import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 초기값은 null로 설정하여 타입 오류 방지
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response: ResponseMyInfoDto = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
        alert("유저 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  // 로딩 처리
  if (!data) return <div className="text-center mt-10">로딩 중...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-2xl font-bold">{data.data?.name}님 환영합니다.</h1>
      <img
        src={data.data?.avatar ?? "https://via.placeholder.com/120"}
        alt="프로필 이미지"
        className="w-[120px] h-[120px] rounded-full object-cover"
      />
      <h2 className="text-lg text-gray-600">{data.data?.email}</h2>

      <button
        className="cursor-pointer bg-blue-400 text-white px-6 py-3 mt-4 rounded hover:scale-95 transition-transform"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
