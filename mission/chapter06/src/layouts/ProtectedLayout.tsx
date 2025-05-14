import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />; // 히스토리가 안남는다
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-15">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
