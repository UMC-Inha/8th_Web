import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({
  children,
}: PropsWithChildren<{}>): JSX.Element => {
  // localStorage에서 초기 테마 불러오기 (없으면 시스템 설정 사용)
  const getInitialTheme = (): TTheme => {
    const storedTheme = localStorage.getItem("theme") as TTheme | null;
    if (storedTheme) return storedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? THEME.DARK : THEME.LIGHT;
  };

  const [theme, setTheme] = useState<TTheme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme); // 테마 변경 시 localStorage에 저장
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
