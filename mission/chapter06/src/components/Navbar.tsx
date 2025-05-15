import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useMutation } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("name") || "사용자";

  const logoutMutation = useMutation(
    async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("accessToken 없음");

      await axiosInstance.post(
        "/v1/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
    },
    {
      onSuccess: () => {
        alert("로그아웃 되었습니다.");
        navigate("/login");
      },
      onError: () => {
        alert("로그아웃 실패");
      },
    }
  );

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <span className="menu-icon" onClick={onMenuClick}>
            ☰
          </span>
          <span className="logo-text" onClick={() => navigate("/")}>
            돌려돌려LP판
          </span>
        </div>
        <div className="navbar-right">
          <span className="search-icon">🔍</span>
          {isLoggedIn ? (
            <>
              <span>{nickname}님 반갑습니다.</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
