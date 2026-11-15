// Server-safe entry (`neus-ui/theme`): design-system data and theme helpers
// without React or CSS, for server code, build scripts and the `neus-ui` CLI.
export { DESIGN_SYSTEMS, DESIGN_SYSTEM_PALETTES } from "./design-systems";
export type { ActionPalette, DesignSystem, DesignSystemId, DesignSystemPalette } from "./design-systems";
export type { ColorScheme, ThemeColors, ThemeConfig } from "./providers/ThemeProvider";
// From the file, not the ThemeProvider barrel, so this entry never loads React or CSS.
export { buildThemeCss, resolveTheme } from "./providers/ThemeProvider/ThemeProvider.utils";
