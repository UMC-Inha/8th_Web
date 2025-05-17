import { useNavigate, NavLink } from "react-router-dom";
import { postSignout } from "../apis/auth";
import { logout } from "../utils/auth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const activeClass = "text-blue-500 font-bold";

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  const { mutate: handleLogout } = useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      logout();
      alert("로그아웃 되었습니다.");
      navigate("/login");
    },
    onError: (err) => {
      console.warn("서버 로그아웃 실패", err);
      logout();
      navigate("/login");
    },
  });

  return (
    <nav className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
      <div className="flex gap-4 items-center">
        <NavLink to="/" className="text-white-600 font-bold text-xl">
          Home
        </NavLink>
      </div>
      <div className="flex gap-4 items-center relative">
        {token ? (
          <div className="relative">
            <span
              onClick={() => setShowLogout((prev) => !prev)}
              className="text-white cursor-pointer"
            >
              {`${name}님 반갑습니다.`}
            </span>
            {showLogout && (
              <button
                onClick={() => handleLogout()}
                className="absolute right-1 top-4 mt-2 bg-gray-700 text-white py-0.5 px-1.5 rounded shadow hover:bg-red-500"
              >
                로그아웃
              </button>
            )}
          </div>
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
