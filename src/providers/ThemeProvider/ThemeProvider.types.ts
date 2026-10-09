import type { ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ColorScheme = "light" | "dark";
export type ColorVariants = { main: string; light: string; dark: string };

export type ThemeColors = {
  primary: ColorVariants;
  success: ColorVariants;
  error: ColorVariants;
  info: ColorVariants;
  white: string;
  black: string;
  gray: Record<900 | 700 | 600 | 500 | 400 | 300 | 200 | 150 | 100, string>;
  borderLight: string;
  shadow: string;
};

export type ThemeConfig = {
  primaryColor?: string;
  successColor?: string;
  errorColor?: string;
  infoColor?: string;
};

export type ThemeContextValue = {
  colors: ThemeColors;
  updateTheme: (config: ThemeConfig) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  designSystem: DesignSystemId;
};

export type ThemeProviderProps = {
  children: ReactNode;
  /** Inherits the parent system, or defaults to Neus UI. */
  designSystem?: DesignSystemId;
  initialTheme?: ThemeConfig;
  initialColorScheme?: ColorScheme;
  /** Controlled mode; use initialColorScheme for internal state. */
  colorScheme?: ColorScheme;
  /** Root providers default to global; nested providers always use a local scope. */
  scope?: "global" | "local";
  /** Class applied to the local scope container. */
  className?: string;
};
