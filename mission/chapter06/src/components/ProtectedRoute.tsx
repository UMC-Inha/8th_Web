import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const isLoggedIn = () => {
  const token = localStorage.getItem("accessToken");
  return !!token && token !== "undefined";
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // alert 여러번 반복 방지

  useEffect(() => {
    if (!isLoggedIn()) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
