import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

const HomeLayout = () => {
    return (
        <div className='h-dvh flex flex-col'>
            <nav className="flex h-15 bg-gray-900"> 
                <Navbar />
            </nav>
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
    )
}

export default HomeLayout
