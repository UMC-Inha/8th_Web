import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    console.log(accessToken);

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("Google 로그인 성공!");
      window.location.href = "/mypage";
    } else {
      alert("로그인에 실패했습니다.");
      navigate("/login");
    }
  }, [navigate]);
  return <div> 로그인 완료</div>;
};

export default GoogleLoginRedirectPage;
