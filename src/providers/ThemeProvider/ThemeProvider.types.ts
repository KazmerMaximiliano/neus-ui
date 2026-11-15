import type { ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ColorScheme = "light" | "dark";
export type ColorVariants = { main: string; light: string; dark: string };

export type ThemeColors = {
  primary: ColorVariants;
  success: ColorVariants;
  error: ColorVariants;
  info: ColorVariants;
  warning: ColorVariants;
  white: string;
  black: string;
  gray: Record<900 | 700 | 600 | 500 | 400 | 300 | 200 | 150 | 100, string>;
  borderLight: string;
  shadow: string;
};

export type ThemeConfig = {
  readonly primaryColor?: string;
  readonly successColor?: string;
  readonly errorColor?: string;
  readonly infoColor?: string;
  readonly warningColor?: string;
};

export type ThemeContextValue = {
  colors: ThemeColors;
  updateTheme: (config: ThemeConfig) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  designSystem: DesignSystemId;
};

export type ThemeProviderProps = {
  readonly children: ReactNode;
  readonly designSystem?: DesignSystemId;
  readonly initialTheme?: ThemeConfig;
  readonly initialColorScheme?: ColorScheme;
  readonly colorScheme?: ColorScheme;
  readonly scope?: "global" | "local";
  readonly className?: string;
};
