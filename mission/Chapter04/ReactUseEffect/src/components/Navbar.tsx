import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeClass = "text-blue-500 font-bold";

  return (
    <nav className="p-4 flex gap-4 bg-gray-100 dark:bg-gray-800">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies/popular"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        인기 영화
      </NavLink>
      <NavLink
        to="/movies/upcoming"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        개봉 예정
      </NavLink>
      <NavLink
        to="/movies/top_rated"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        평점 높은
      </NavLink>
      <NavLink
        to="/movies/now_playing"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        상영 중
      </NavLink>
    </nav>
  );
};

export default Navbar;
