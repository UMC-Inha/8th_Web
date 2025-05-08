import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return <Navigate to = {"/login"} state = {location} replace/>;
    }

    return ( 
        <>
            <nav className="flex h-15 bg-gray-900"> 
                <Navbar />
            </nav>

            <main className='flex-1'>
                <Outlet />
            </main>
        </>
        )

}

export default ProtectedLayout;