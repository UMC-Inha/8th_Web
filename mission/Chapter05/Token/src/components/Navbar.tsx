import { useNavigate, NavLink } from "react-router-dom";
import { postSignout } from "../apis/auth";
import { logout } from "../utils/auth";

const Navbar = () => {
  const activeClass = "text-blue-500 font-bold";

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    try {
      await postSignout();
    } catch (e) {
      console.warn("서버 로그아웃 실패", e);
    } finally {
      logout();
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  return (
    <nav className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
      <NavLink to="/" className="text-white-600 font-bold text-xl">
        Home
      </NavLink>
      <div className="flex gap-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400 font-semibold"
          >
            로그아웃
          </button>
        ) : (
          <div className="flex gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              회원가입
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
