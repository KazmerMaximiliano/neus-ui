import { createContext } from "react";
import type { ThemeContextValue } from "./ThemeProvider.types";

/** Shares the resolved theme and its update handlers with descendant components. */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
