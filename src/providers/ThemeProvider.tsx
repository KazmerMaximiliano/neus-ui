import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDarkenColor, hexToRgb } from "../utils";

export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
  };
  white: string;
  black: string;
  gray: {
    900: string;
    700: string;
    600: string;
    500: string;
    400: string;
    300: string;
    200: string;
    150: string;
    100: string;
  };
  borderLight: string;
  shadow: string;
}

export interface ThemeConfig {
  primaryColor?: string;
  successColor?: string;
  errorColor?: string;
  infoColor?: string;
}

interface ThemeContextValue {
  colors: ThemeColors;
  updateTheme: (config: ThemeConfig) => void;
}

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

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeConfig;
}

const generateColorVariants = (mainColor: string) => {
  const rgb = hexToRgb(mainColor);
  if (!rgb) return { main: mainColor, light: mainColor, dark: mainColor };

  const lightColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
  const darkColor = getDarkenColor(mainColor, 15);

  return {
    main: mainColor,
    light: lightColor,
    dark: darkColor,
  };
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = {},
}) => {
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

  const updateCSSVariables = (newColors: ThemeColors) => {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", newColors.primary.main);
    root.style.setProperty("--color-primary-light", newColors.primary.light);
    root.style.setProperty("--color-primary-dark", newColors.primary.dark);

    root.style.setProperty("--color-success", newColors.success.main);
    root.style.setProperty("--color-success-light", newColors.success.light);
    root.style.setProperty("--color-success-dark", newColors.success.dark);

    root.style.setProperty("--color-error", newColors.error.main);
    root.style.setProperty("--color-error-light", newColors.error.light);
    root.style.setProperty("--color-error-dark", newColors.error.dark);

    root.style.setProperty("--color-info", newColors.info.main);
    root.style.setProperty("--color-info-light", newColors.info.light);
    root.style.setProperty("--color-info-dark", newColors.info.dark);

    root.style.setProperty("--color-border-light", newColors.borderLight);
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

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  const contextValue: ThemeContextValue = {
    colors,
    updateTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
