import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();


  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("현재 accessToken:", token);

      try {
        const response = await getMyInfo();
        console.log("getMyInfo 응답:", response);

        setData(response);
      } catch (error) {
        console.error("인증 실패:", error);
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
  
      {data && (
        <>
          <h1>{data.data.name}님 환영합니다</h1>
          <h1>{data.data.email}</h1>
        </>
      )}

      <button className="bg-black text-white" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
