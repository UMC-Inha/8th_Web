import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logout } from "../utils/logout";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("name") || "사용자";

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } else {
      alert("로그아웃 실패");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <span className="menu-icon">☰</span>
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
              <button
                onClick={() => navigate("/login")}
                className="login-button"
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="register-button"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
