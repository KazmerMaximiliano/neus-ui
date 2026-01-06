// Import CSS styles for the library
// Users must import this CSS file in their application
// import 'neus-ui/dist/index.css';
import './index.css';

// Theme system exports
export { useColors } from './components/theme';
export { ThemeProvider, useTheme, type ThemeColors, type ThemeConfig } from './providers';

// Color utility functions
export {
  getDarkenColor, getLightenColor, hexToRgb,
  rgbToHex, type RGB
} from './utils';

// Component exports
export * from './components';

// Hook exports
export { useResponsive } from './hooks/useResponsive';
