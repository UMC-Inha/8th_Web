import clsx from "clsx";
import { THEME,useTheme } from "./ThemeProvider";


export default function ThemeContent(){

    const {theme} =useTheme();

    const isLightMode =theme ===THEME.LIGHT;

    return (
        <div className={clsx(
            'p-4 hdvh w-full',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}
        >
            <h1 className={clsx(
                'text-wxl font bold',
                isLightMode ? 'text-black' : 'text-white'
            )}
            >
                Theme Content
            </h1>
            <p className={clsx('mt-2',isLightMode ? 'text-black' : 'text-white')}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Obcaecati quis placeat est velit sapiente. Ad, voluptate, ab cum nam, 
                vitae dolorem deserunt quo dolorum a in quasi cupiditate consequuntur 
                quis?
            </p>
        </div>
    );
}