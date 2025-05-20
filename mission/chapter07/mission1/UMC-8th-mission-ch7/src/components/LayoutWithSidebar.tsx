import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaBars } from "react-icons/fa";

const LayoutWithSidebar = () => {
  const { accessToken, user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // ESC 누르면 사이드바 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={closeSidebar}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-zinc-900 p-6 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-10 flex flex-col gap-4">
          <Link
            to="/search"
            className="hover:text-pink-400 flex items-center gap-2"
            onClick={closeSidebar}
          >
            <FaSearch /> 찾기
          </Link>
          <Link
            to="/my"
            className="hover:text-pink-400 flex items-center gap-2"
            onClick={closeSidebar}
          >
            👤 마이페이지
          </Link>
        </nav>
        {accessToken && (
          <button
            onClick={() => {
              logout();
              closeSidebar();
              navigate("/");
            }}
            className="mt-10 text-sm text-gray-400 hover:text-red-400"
          >
            로그아웃
          </button>
        )}
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow z-30 relative">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-xl">
              <FaBars />
            </button>
            <Link to="/" className="text-pink-500 text-xl font-bold">
              돌려돌려 LP판
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/search" className="text-lg hover:text-pink-400">
              🔍
            </Link>
            {accessToken ? (
              <>
                <span className="text-sm">{user?.name}님 반갑습니다.</span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-sm hover:text-red-500"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm hover:text-pink-400">
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-pink-500 px-2 py-1 rounded text-sm text-white hover:bg-pink-600"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <main className="p-4 flex-1 overflow-y-auto mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
