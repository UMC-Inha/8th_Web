import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition ${
      isActive ? "bg-white text-blue-500 font-bold" : "text-white"
    }`;
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-500 flex gap-4 p-4 text-sm">
      <NavLink to="/" className={linkClass}>
        홈
      </NavLink>
      <NavLink to="/movies/popular" className={linkClass}>
        인기 영화
      </NavLink>
      <NavLink to="/movies/now_playing" className={linkClass}>
        상영 중
      </NavLink>
      <NavLink to="/movies/top-rated" className={linkClass}>
        평점 높은
      </NavLink>
      <NavLink to="/movies/upcoming" className={linkClass}>
        개봉 예정
      </NavLink>
    </nav>
  );
};

export default Navbar;
