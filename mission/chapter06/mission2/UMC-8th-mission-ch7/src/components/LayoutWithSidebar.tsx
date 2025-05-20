import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LayoutWithSidebar = () => {
  const { accessToken, user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* 사이드바 */}
      <aside
  className={`fixed top-0 left-0 h-full z-20 bg-zinc-900 w-60 p-4 pt-12
    ${isSidebarOpen ? "block" : "hidden"}`}
>
  <button
    onClick={toggleSidebar}
    className="absolute top-4 left-4 text-2xl text-gray-400 hover:text-white z-30"
  >
    ☰
  </button>

  <nav className="mt-10 flex flex-col gap-2">
    <Link to="/search" className="hover:text-pink-500">🔍 찾기</Link>
    <Link to="/my" className="hover:text-pink-500">👤 마이페이지</Link>
  </nav>

  <button
    onClick={() => logout()}
    className="mt-10 text-sm text-gray-400 hover:text-red-400"
  >
    로그아웃
  </button>
</aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow">
  <div className="flex items-center gap-4">
    <button onClick={toggleSidebar} className="text-xl">☰</button>
    <h1 className="text-pink-500 text-xl font-bold">돌려돌려LP판</h1>
  </div>

  <div className="flex items-center gap-4 ml-auto">
    <span className="text-sm">🔍</span>
    {accessToken ? (
      <>
        <span className="text-sm">{user?.name}님 반갑습니다.</span>
        <button
          onClick={() => logout()}
          className="text-sm hover:text-red-500"
        >
          로그아웃
        </button>
      </>
    ) : (
      <>
        <Link to="/login" className="text-sm">로그인</Link>
        <Link to="/signup" className="bg-pink-500 px-2 py-1 rounded text-sm">회원가입</Link>
      </>
    )}
  </div>
</header>

        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
