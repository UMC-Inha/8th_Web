import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

type NavbarProps = {
  onSidebarToggle?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("오류입니다", error);
      }
    };
    getData();
  }, []);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <button
            className="p-2 mr-2 rounded md-hidden
          hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
            onClick={onSidebarToggle}
          >
            ☰
          </button>

          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            돌려돌려돌림판
          </Link>
        </div>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <span className="dark:text-gray-300">
              {data?.data.name}님, 반갑습니다.
            </span>
          )}
          {accessToken && (
            <button
              className="cursor-pointer dark:text-gray-300 hover:text-blue-500"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
