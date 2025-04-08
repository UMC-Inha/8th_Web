// navbar.tsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="p-4 bg-gray-100">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    `mr-4 text-xl px-4 py-2 rounded ${isActive ? "text-green-600" : "text-gray-800"}`
                }
            >
                홈
            </NavLink>
            <NavLink
                to="/movies/popular"
                className={({ isActive }) =>
                    `mr-4 text-xl px-4 py-2 rounded ${isActive ? "text-green-600" : "text-gray-800"}`
                }
            >
                인기 영화
            </NavLink>
            <NavLink
                to="/movies/upcoming"
                className={({ isActive }) =>
                    `mr-4 text-xl px-4 py-2 rounded ${isActive ? "text-green-600" : "text-gray-800"}`
                }
            >
                상영 중
            </NavLink>
            <NavLink
                to="/movies/top_rated"
                className={({ isActive }) =>
                    `mr-4 text-xl px-4 py-2 rounded ${isActive ? "text-green-600" : "text-gray-800"}`
                }
            >
                평점 높은
            </NavLink>
            <NavLink
                to="/movies/now_playing"
                className={({ isActive }) =>
                    `mr-4 text-xl px-4 py-2 rounded ${isActive ? "text-green-600" : "text-gray-800"}`
                }
            >
                개봉 예정
            </NavLink>
        </nav>
    );
};

export default Navbar;
// vsc 상에서
// 'Link'은(는) JSX 구성 요소로 사용할 수 없습니다.
//   해당 반환 형식 'ReactNode'은(는) 유효한 JSX 요소가 아닙니다.
//     'undefined' 형식은 'Element | null' 형식에 할당할 수 없습니다.
// 라는 문구가 뜨며 오류 표기가 되는 현상 -> 작동은 문제 없음!
// 리액트 버전 문제
// 해결 방법 : package.json에 resolutions를 추가해 라이브러리가 사용할 react의 버전을 고정해준다.