import { THEME, useTheme } from "./context/ThemeProvider"
import { ThemeToggleButton } from './context/ThemeToggleButton';
import React from "react";
import clsx from 'clsx'

export default function Navbar(): React.JSX.Element {
    const { theme } = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav 
            className={clsx(
                'p-s w-full flex justify-end',
                isLightMode ? 'bg-white' : 'bg-gray-800'
            )}
        >
            <ThemeToggleButton />
        </nav>
    )
}