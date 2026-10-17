// Server-safe entry (`neus-ui/theme`): design-system data and theme helpers
// without React or CSS, for server code, build scripts and the `neus` CLI.
export { DESIGN_SYSTEMS, DESIGN_SYSTEM_PALETTES } from "./design-systems/design-systems.consts";
export type { ActionPalette, DesignSystem, DesignSystemId, DesignSystemPalette } from "./design-systems/design-systems.types";
export type { ColorScheme, ThemeColors, ThemeConfig } from "./providers/ThemeProvider/ThemeProvider.types";
export { buildThemeCss, resolveTheme } from "./providers/ThemeProvider/ThemeProvider.utils";
