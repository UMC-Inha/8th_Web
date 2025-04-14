import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/NavBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      {/* 네비게이션 */}
      <Navbar />

      {/* 메인 타이틀 영역 */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl font-extrabold mb-4">영화</h1>
        <p className="text-lg text-gray-300 max-w-xl">
          TMDB API를 활용한 영화 정보 서비스입니다.
        </p>
      </div>

      {/* 자식 라우트 출력 자리 */}
      <Outlet />
    </div>
  );
}
