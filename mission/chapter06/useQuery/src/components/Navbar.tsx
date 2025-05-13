import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (accessToken) {
      getMyInfo()
        .then((res: ResponseMyInfoDto) => setUsername(res.data?.name ?? ""))
        .catch(() => {
          logout();
          navigate("/login");
        });
    }
  }, [accessToken, logout, navigate]);

  // 화면 크기 변화나 외부 클릭 시 사이드바 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 mr-4"
          >
            <FaBars className="w-6 h-6" />
          </button>

          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white flex-1">
            DOLIGO
          </Link>

          <div className="flex items-center space-x-6">
            {!accessToken ? (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  로그인
                </Link>
                <Link to="/signup" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link to="/search" className="hover:text-blue-500">
                  <FaSearch className="w-5 h-5 inline-block text-white" />
                </Link>
                <span className="text-gray-700 dark:text-gray-300">
                  {username}님, 반갑습니다
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-500"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;