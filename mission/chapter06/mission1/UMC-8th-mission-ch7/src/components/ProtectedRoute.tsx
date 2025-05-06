import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
