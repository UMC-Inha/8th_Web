import { Outlet, Link } from "react-router-dom"

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col bg-black text-white">
            <nav className="flex justify-between items-center px-6 py-4 bg-zinc-900 shadow"><h1 className="text-pink-500 text-xl font-bold">돌려돌려 LP판!</h1>
        <div className="flex gap-2">
          <Link to="/login" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm">
            로그인
          </Link>
          <Link to="/signup" className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded text-sm text-white">
            회원가입
          </Link>
        </div>
            </nav>

           <main className="flex-1 flex justify-center items-center px-4">
                <Outlet />
            </main> 
            <footer className="bg-zinc-900 text-center text-sm py-4"></footer>
        </div>
        
    )
}

export default HomeLayout