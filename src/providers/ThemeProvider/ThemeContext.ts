import { createContext } from "react";
import type { ThemeContextValue } from "./ThemeProvider.types";

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
