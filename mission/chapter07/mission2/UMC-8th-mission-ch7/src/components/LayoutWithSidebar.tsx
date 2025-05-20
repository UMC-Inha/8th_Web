import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import Modal from "./Modal";

const LayoutWithSidebar = () => {
  const { accessToken, logout } = useAuth();
  const { data: me } = useGetMyInfo(!!accessToken);
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // ESC 키 또는 창 크기 변경 시 사이드바 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleWithdraw = async () => {
    // 실제 탈퇴 처리 로직 필요
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* 사이드바 오버레이 */}
      <div
        className={`
          fixed top-0 left-0 right-0 bottom-0 z-20
          bg-black/50 transition-opacity
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setSidebarOpen(false)}
      >
        {/* 사이드바 내용 */}
        <div
          className={`
            absolute left-0 top-0 w-64 h-full
            bg-zinc-900 shadow-lg
            transform transition-transform
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col h-full p-4">
            <div className="space-y-4">
              <Link
                to="/search"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-2 text-white hover:text-pink-400"
              >
                <FaSearch />
                <span>찾기</span>
              </Link>
              <Link
                to="/my"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-2 text-white hover:text-pink-400"
              >
                <FaUser />
                <span>마이페이지</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="mt-auto flex items-center space-x-2 text-red-400 hover:text-red-600"
            >
              <FaSignOutAlt />
              <span>탈퇴하기</span>
            </button>
          </nav>
        </div>
      </div>

      {/* 헤더 */}
      <header className="fixed w-full z-30 bg-zinc-900 shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-white hover:text-pink-400"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <Link to="/" className="text-pink-500 text-xl font-bold">
            돌려돌려 LP판
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!accessToken ? (
            <>
              <Link to="/login" className="hover:text-pink-400 text-sm">
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 px-2 py-1 rounded text-sm text-white hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to="/search" className="hover:text-pink-400">
                <FaSearch className="w-5 h-5" />
              </Link>
              {me?.data?.name && (
                <span className="text-sm">{me.data.name}님, 반갑습니다</span>
              )}
              <button
                onClick={handleLogout}
                className="text-sm hover:text-red-500"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 mt-16 p-4 overflow-y-auto">
        <Outlet />
      </main>

      {/* 탈퇴 확인 모달 */}
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="text-center space-y-6">
          <p className="text-lg font-medium text-white">정말 탈퇴하시겠습니까?</p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => {
                handleWithdraw();
                setConfirmOpen(false);
                setSidebarOpen(false);
              }}
              className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              예
            </button>
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              아니요
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LayoutWithSidebar;
