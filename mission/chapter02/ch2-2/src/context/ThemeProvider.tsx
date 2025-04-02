import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME { // 테마를 enum으로 관리
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

export type TTheme = THEME.LIGHT | THEME.DARK; // 테마는 라이트 또는 다크모드

interface IThemeContext { // 테마를 만들어 줄거임
    theme: TTheme
    toggleTheme: () => void; // 테마 변경 액션
}

export const ThemeContext = createContext<IThemeContext|undefined>(undefined);
// 테마를 받을 수 있고, 테마 변경하는 것도 받을 수 있음

export const ThemeProvider = ({children}:PropsWithChildren)
: React.JSX.Element => { // 우산을 전체적으로 씌워줄거 
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = (): void => {
        setTheme((prevTheme): THEME =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
            // 이전테마가 라이트모드면 다크모드로 바꾸고, 
            // 그렇지 않으면(다크모드면) 라이트모드로 바꾸기
        );
    };

    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
    )
}

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}