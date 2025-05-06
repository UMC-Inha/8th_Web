import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />; // 히스토리가 안남는다
  }

  return <Outlet />;
};

export default ProtectedLayout;
