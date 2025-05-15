import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const HomeLayout = () => {
    return (
        <div className='h-dvh flex flex-col'>
            <Navbar />

            <main className='overflow-auto flex-1 mt-17'>
                <Outlet />
            </main>

            <Footer/>
        </div>
    )
}

export default HomeLayout
