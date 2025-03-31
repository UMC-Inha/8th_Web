import React from "react";
import { THEME } from "./context/Themeprovider";
import clsx from "clsx";
import { useTheme } from "./context/Themeprovider";

export default function ThemeContent(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p=4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt qui, dolor
        illo eum ea quisquam! Magnam, quos. Facere, vitae, corporis odio tempore
        omnis est officia saepe dolorum nobis ratione esse!
      </p>
    </div>
  );
}
