import React, { ReactNode } from "react";
import { type ThemeConfig } from "./ThemeContext";
export interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: ThemeConfig;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
