// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar= () => {

//     const {accessToken} = useAuth();
//     return (
       
//         <nav className="bg-white dark:bg-gray-900 shadow-md w-full z-10 sm:px-4 py-2.5 dark:border-gray-700">
//             <div className="flex items-center justify-between max-w-screen-xxl mx-auto p-4">
//                 <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
//                 My LP
//                 </Link>
//             <div className="space-x-6">
//             {!accessToken&&(
//                 <>
//                 <Link to="/login" className="text-gray-900 dark:text-white hover:underline">로그인</Link>
//                 <Link to="/signup" className="text-gray-900 dark:text-white hover:underline">회원가입</Link>
//                 </> 
//                 )}
//                 {accessToken&&(
//                 <Link to="/my" className="text-gray-900 dark:text-white hover:underline">마이페이지</Link>
//                 )}
//                 <Link to="/search" className="text-gray-900 dark:text-white hover:underline">검색</Link>

//             </div>
               
           
            
//            </div>
          
//         </nav>
//     );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (accessToken) {
          const response: ResponseMyInfoDto = await getMyInfo();
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        setUserName(null); // 실패 시 초기화
      }
    };

    fetchUser();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <nav className="bg-white dark:bg-gray-900 shadow-md w-full z-10 sm:px-4 py-2.5 dark:border-gray-700">
        <div className="flex items-center justify-between max-w-screen-xxl mx-auto p-4">
          {/* 왼쪽: 토글 버튼 + 로고 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-900 dark:text-white text-2xl focus:outline-none"
            >
              ☰
            </button>
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              My LP
            </Link>
          </div>

          {/* 오른쪽: 로그인/회원가입 or 이름 + 로그아웃 */}
          <div className="flex items-center space-x-4">
            {accessToken ? (
              <>
                {userName && (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {userName}님 반갑습니다.
                  </span>
                )}
               <button
                onClick={handleLogout}
                className="px-4 py-1 rounded border border-gray-300 dark:border-white 
             text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 
             transition-colors duration-200"
>
  로그아웃
</button>

              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 dark:text-white hover:underline">
                  로그인
                </Link>
                <Link to="/signup" className="text-gray-900 dark:text-white hover:underline">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
