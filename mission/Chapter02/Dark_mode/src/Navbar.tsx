import React from "react";
import { THEME, useTheme } from "./context/Themeprovider";
import ThemeToggleButton from "./context/ThemeToggleButton";
import clsx from "clsx";

export default function Navbar(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p=4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
