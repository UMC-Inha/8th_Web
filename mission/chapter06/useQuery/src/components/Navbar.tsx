import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const { data: me } = useGetMyInfo();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 mr-4"
          >
            <FaBars className="w-6 h-6" />
          </button>

          <Link to="/" className="flex-1 text-xl font-bold text-gray-900 dark:text-white">
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
                {me?.data?.name && (
                  <span className="text-gray-700 dark:text-gray-300">
                    {me.data.name}님, 반갑습니다
                  </span>
                )}
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