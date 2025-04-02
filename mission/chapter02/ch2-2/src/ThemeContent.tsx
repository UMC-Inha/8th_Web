// 테마를 받는

import { THEME, useTheme } from "./context/ThemeProvider";
import React from "react";
import clsx from 'clsx';

export default function ThemeContent(): React.JSX.Element {
    const { theme } = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx(
            'p-4 h-dvh w-full',
            isLightMode ? 'bg-white' : 'bg-gray-800)'
            )}
        >
            <h1 className={clsx(
                'text-wx1 font-bold',
                isLightMode ? 'text-black' : 'text-white'
                )}
            >
                Theme Content
            </h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Veniam tenetur, recusandae nisi dignissimos accusamus explicabo 
                numquam nobis doloremque cum a harum ducimus ipsam possimus 
                impedit minus. Quae enim consequatur perferendis.
            </p>
        </div>
    )
}