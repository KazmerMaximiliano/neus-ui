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
export interface ThemeContextValue {
    colors: ThemeColors;
    updateTheme: (config: ThemeConfig) => void;
}
export declare const ThemeContext: import("react").Context<ThemeContextValue | undefined>;
