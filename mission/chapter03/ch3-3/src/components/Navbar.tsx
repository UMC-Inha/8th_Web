import { NavLink } from "react-router-dom"

const LINKS = [
    {to: '/', label: '홈'},
    {to: '/movies/popular', label: '인기영화'},
    {to: '/movies/now_playing', label: '상영중'},
    {to: '/movies/top_rated', label: '평점높은'},
    {to: '/movies/upcoming', label: '개봉예정'},
]

export const Navbar = () => {
    return (
        <div className="flex gap-3 p-4">
            {LINKS.map(({to, label}) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({isActive}): any => {
                    return isActive ? 'text-blue-600 font-bold underline underline-offset-4 transition-all duration-200' 
                    : 'text-gray-400 hover:text-gray-600 transition-colors duration-200'
                  }}
                >
                  {label}
                </NavLink>
            ))}
        </div>
    )
}