import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import type { ThemeContextValue } from "../ThemeProvider.types";

/** Returns the nearest provider's theme, throwing when no provider is mounted. */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
