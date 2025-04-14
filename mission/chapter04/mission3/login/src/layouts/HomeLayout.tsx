
// import { Outlet } from "react-router-dom";

// const HomeLayout = () => {
//   return (
//     <div className="h-dvh flex flex-col bg-white">

//       <nav className="bg-black text-pink-400 px-6 py-4 shadow-md">
//           <h1 className="text-xl font-semibold tracking-wide">돌려돌려 LP판</h1>
//       </nav>

//       <main className="flex-1">
//         <Outlet />
//       </main>
//       <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
//         푸터
//       </footer>
//     </div>
//   );
// };

// export default HomeLayout;



import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-black text-white">
      
      <nav className="bg-black px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <Link to="/" className="text-pink-500 text-lg font-bold">
            돌려돌려 LP판
          </Link>

          
          <div className="space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              회원가입
            </Link>
          </div>
        </div>
      </nav>

      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        푸터
      </footer>
    </div>
  );
};

export default HomeLayout;
