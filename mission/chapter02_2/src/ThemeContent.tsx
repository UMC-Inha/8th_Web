import clsx from "clsx";
import { THEME, useTheme, ThemeContext } from './Context/ThemeProvider';

const ThemeContent = () => {
    const {theme, toggleTheme} = useTheme();

    const isLightMode = theme ===THEME.LIGHT;

    return (
        <div className = {clsx ('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}>
            <h1 className = {clsx ('text-wxl font-bold', isLightMode ? 'text-black' : 'text-white')}>
                ThemeContext
            </h1>
            <p className = {clsx ('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor laudantium magnam minus nulla pariatur? Labore nostrum doloremque sit iure ex doloribus dolorum mollitia debitis error quis, voluptates velit repellendus sed.
            </p>
        </div>
    )
}

export default ThemeContent
