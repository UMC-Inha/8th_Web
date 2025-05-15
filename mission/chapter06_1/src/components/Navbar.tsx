import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { accessToken, name } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
    const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  }

  return (
    <>
      <nav className='bg-white dark:bg-gray-900 shadow-md fixed w-full z-50'>
        <div className='flex items-center justify-between p-2'>

          <div className='space-x-3'>
            <button 
              className="p-2 text-3xl text-gray-800 dark:text-white z-50 relative" 
              onClick={toggleSidebar}>
              {isOpen ? "=͟͟͞͞♡" : "♡⃣"}
            </button>

            <Link
              to="/"
              className='text-xl font-bold text-gray-900 dark:text-white'
            >
              CHICHI's HOMEPAGE ՞꜆Q ω Q꜀՞
            </Link>
          </div>

          <div className='space-x-3 hidden md:flex'>
            {accessToken && (
              <>
                <Link to="/my" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> {name} 님 반갑습니다 </Link>
                <Link to="/lp" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 내 LP </Link>
                <button 
                  className ='text-gray-700 dark:text-gray-300 hover:text-blue-500' 
                  onClick={handleLogout}> 
                    로그아웃 
                </button>
              </>
            )}

            {!accessToken && (
              <>
                <Link to="/login" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 로그인 </Link>
                <Link to="/signup" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 회원가입 </Link>
              </>
            )}

            <Link to="/search" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'>검색</Link>
          </div>

        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-15 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col space-y-4 items-center">
          {accessToken && (
            <>
              <Link to="/my" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> -ˋˏ  {name}님 반갑습니다 ˎˊ- </Link>
              <Link to="/lp" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 내 LP </Link>
              <button 
                className ='margin-left text-gray-700 dark:text-gray-300 hover:text-blue-500' 
                onClick={handleLogout}> 
                  로그아웃 
              </button>
            </>
          )}

          {!accessToken && (
            <>
              <Link to="/login" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 로그인 </Link>
              <Link to="/signup" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'> 회원가입 </Link>
            </>
          )}

          <Link to="/search" className='text-gray-700 dark:text-gray-300 hover:text-blue-500'>검색</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
