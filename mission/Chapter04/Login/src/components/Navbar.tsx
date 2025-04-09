import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClass = "text-blue-500 font-bold";

  return (
    <nav className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
      <NavLink to="/" className="text-white-600 font-bold text-xl">
        Home
      </NavLink>
      <div className="flex gap-4">
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? activeClass : "")}
        >
          로그인
        </NavLink>
        <button className="text-gray-700 dark:text-white">회원가입</button>
      </div>
    </nav>
  );
};

export default Navbar;
