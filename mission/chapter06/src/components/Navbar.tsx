import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import "./Navbar.css";

const fetchUserProfile = async () => {
  const res = await axiosInstance.get("/v1/users/me");
  return res.data.data;
};

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const { data: userProfile } = useQuery("userProfile", fetchUserProfile, {
    enabled: isLoggedIn,
  });

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

      queryClient.removeQueries("userProfile");
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

  const nickname = userProfile?.name || "사용자";

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
