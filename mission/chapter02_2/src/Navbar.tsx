import { useContext } from "react"
import { THEME, useTheme } from "./Context/ThemeProvider";
import clsx from "clsx";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
    const {theme} = useTheme();

    const isLightMode = theme ===THEME.LIGHT;

    return (
        <nav className = {clsx ('p-4 w-full flex justify-end',
            isLightMode ? 'bg-white' : 'bg-gray-888'
            )}>
            <ThemeToggleButton/>
        </nav>
    )
}

export default Navbar

