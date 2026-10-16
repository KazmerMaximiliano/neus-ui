// Import CSS styles for the library
// Users must import this CSS file in their application
// import 'neus-ui/dist/neus-ui.css';
import './css/app.css';

// Theme system exports
export { useColors } from './components/theme';
export { ThemeProvider, useTheme, type ThemeColors, type ThemeConfig, type ThemeProviderProps, type ColorScheme } from './providers';
export { DESIGN_SYSTEMS, type DesignSystem, type DesignSystemId } from './design-systems';

// Color utility functions
export {
  getDarkenColor, getLightenColor, hexToRgb,
  rgbToHex, type RGB
} from './utils';

// Component exports
export * from './components';

// Templates exports
export * from './templates';

// Hook exports
export { useResponsive } from './hooks/useResponsive';
