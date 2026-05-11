import React, { ReactNode, useEffect, useState } from "react";
import { getDarkenColor, getLightenColor, hexToRgb } from "../utils";
import {
  ThemeContext,
  type ColorScheme,
  type ThemeColors,
  type ThemeConfig,
  type ThemeContextValue,
} from "./ThemeContext";

const defaultColors: ThemeColors = {
  primary: {
    main: "#283593",
    light: "rgba(40, 53, 147, 0.1)",
    dark: "#1c258c",
  },
  success: {
    main: "#4caf50",
    light: "rgba(76, 175, 80, 0.1)",
    dark: "#357a3a",
  },
  error: {
    main: "#f44336",
    light: "rgba(244, 67, 54, 0.1)",
    dark: "#d32f2f",
  },
  info: {
    main: "#283593",
    light: "rgba(40, 53, 147, 0.1)",
    dark: "#1a237e",
  },
  white: "#ffffff",
  black: "#000000",
  gray: {
    900: "#333333",
    700: "#475569",
    600: "#666666",
    500: "#64748b",
    400: "#6b7280",
    300: "#cbd5e1",
    200: "#e0e0e0",
    150: "#e5e7eb",
    100: "#f9fafb",
  },
  borderLight: "rgba(40, 53, 147, 0.1)",
  shadow: "rgba(0, 0, 0, 0.1)",
};

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeConfig;
  initialColorScheme?: ColorScheme;
}

const generateColorVariants = (mainColor: string, isDark = false) => {
  const rgb = hexToRgb(mainColor);
  if (!rgb) return { main: mainColor, light: mainColor, dark: mainColor };

  if (isDark) {
    const lightenedMain = getLightenColor(mainColor, 60);
    const lightenedRgb = hexToRgb(lightenedMain) ?? rgb;
    return {
      main: lightenedMain,
      light: `rgba(${lightenedRgb.r}, ${lightenedRgb.g}, ${lightenedRgb.b}, 0.15)`,
      dark: getLightenColor(mainColor, 80),
    };
  }

  return {
    main: mainColor,
    light: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
    dark: getDarkenColor(mainColor, 15),
  };
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = {},
  initialColorScheme = "light",
}) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(initialColorScheme);
  const [colors, setColors] = useState<ThemeColors>(() => {
    const newColors = { ...defaultColors };

    if (initialTheme.primaryColor) {
      newColors.primary = generateColorVariants(initialTheme.primaryColor);
      newColors.borderLight = newColors.primary.light;
    }
    if (initialTheme.successColor) {
      newColors.success = generateColorVariants(initialTheme.successColor);
    }
    if (initialTheme.errorColor) {
      newColors.error = generateColorVariants(initialTheme.errorColor);
    }
    if (initialTheme.infoColor) {
      newColors.info = generateColorVariants(initialTheme.infoColor);
    }

    return newColors;
  });

  const updateCSSVariables = (newColors: ThemeColors, scheme: ColorScheme) => {
    const root = document.documentElement;
    const isDark = scheme === "dark";

    const primary = generateColorVariants(newColors.primary.main, isDark);
    const success = generateColorVariants(newColors.success.main, isDark);
    const error = generateColorVariants(newColors.error.main, isDark);
    const info = generateColorVariants(newColors.info.main, isDark);

    root.style.setProperty("--color-primary", primary.main);
    root.style.setProperty("--color-primary-light", primary.light);
    root.style.setProperty("--color-primary-dark", primary.dark);

    root.style.setProperty("--color-success", success.main);
    root.style.setProperty("--color-success-light", success.light);
    root.style.setProperty("--color-success-dark", success.dark);

    root.style.setProperty("--color-error", error.main);
    root.style.setProperty("--color-error-light", error.light);
    root.style.setProperty("--color-error-dark", error.dark);

    root.style.setProperty("--color-info", info.main);
    root.style.setProperty("--color-info-light", info.light);
    root.style.setProperty("--color-info-dark", info.dark);

    root.style.setProperty("--color-border-light", primary.light);
    root.style.setProperty("--color-border-input", primary.light);
    root.style.setProperty("--color-border", primary.light);

    const primaryRgb = hexToRgb(newColors.primary.main);
    const errorRgb = hexToRgb(newColors.error.main);
    const successRgb = hexToRgb(newColors.success.main);
    const focusOpacity = isDark ? 0.25 : 0.18;

    if (primaryRgb) {
      root.style.setProperty(
        "--color-focus-ring",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${focusOpacity})`
      );
      root.style.setProperty(
        "--color-info-100",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.05)`
      );
      root.style.setProperty(
        "--color-info-300",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.4)`
      );
      root.style.setProperty(
        "--color-outlined-ring",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.4)`
      );
      root.style.setProperty(
        "--color-outlined-ring-hover",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.7)`
      );
    }
    if (errorRgb) {
      root.style.setProperty(
        "--color-focus-ring-error",
        `rgba(${errorRgb.r}, ${errorRgb.g}, ${errorRgb.b}, ${focusOpacity})`
      );
      root.style.setProperty(
        "--color-outlined-ring-error",
        `rgba(${errorRgb.r}, ${errorRgb.g}, ${errorRgb.b}, 0.4)`
      );
      root.style.setProperty(
        "--color-outlined-ring-error-hover",
        `rgba(${errorRgb.r}, ${errorRgb.g}, ${errorRgb.b}, 0.7)`
      );
    }
    if (successRgb) {
      root.style.setProperty(
        "--color-outlined-ring-success",
        `rgba(${successRgb.r}, ${successRgb.g}, ${successRgb.b}, 0.4)`
      );
      root.style.setProperty(
        "--color-outlined-ring-success-hover",
        `rgba(${successRgb.r}, ${successRgb.g}, ${successRgb.b}, 0.7)`
      );
    }
  };

  const updateTheme = (config: ThemeConfig) => {
    setColors((prevColors) => {
      const newColors = { ...prevColors };

      if (config.primaryColor) {
        newColors.primary = generateColorVariants(config.primaryColor);
        newColors.borderLight = newColors.primary.light;
      }
      if (config.successColor) {
        newColors.success = generateColorVariants(config.successColor);
      }
      if (config.errorColor) {
        newColors.error = generateColorVariants(config.errorColor);
      }
      if (config.infoColor) {
        newColors.info = generateColorVariants(config.infoColor);
      }

      return newColors;
    });
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  useEffect(() => {
    updateCSSVariables(colors, colorScheme);
  }, [colors, colorScheme]);

  useEffect(() => {
    setColorSchemeState(initialColorScheme);
  }, [initialColorScheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
    document.body.style.backgroundColor =
      colorScheme === "dark" ? "#1e1e2e" : "";
    document.body.style.transition = "background-color 0.2s ease";
  }, [colorScheme]);

  const contextValue: ThemeContextValue = {
    colors,
    updateTheme,
    colorScheme,
    setColorScheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
