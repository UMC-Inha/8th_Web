import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/login", label: "로그인" },
  { to: "/signup", label: "회원가입" },
];

export const Navbar = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="items-center px-3 text-[hotpink] text-2xl">돌려돌려LP판</p>

      {LINKS.map(({ to, label }) => (
        <div key={to} className="border border-gray-500 p-2 rounded-sm">
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive ? "text-[hotpink] font-bold" : "text-white"
            }
          >
            {label}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
