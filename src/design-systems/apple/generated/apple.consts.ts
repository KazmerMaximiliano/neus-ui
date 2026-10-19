/* Generated from src/design-systems/apple/DESIGN.md. Edit the document, then run pnpm design:generate. */
import type { DesignSystemPalette } from "../../design-systems.types";

export const APPLE_METADATA = {
  "id": "apple",
  "name": "Apple",
  "description": "Action blue, soft corners, and system typography.",
  "source": "src/design-systems/apple/DESIGN.md"
} as const;

export const APPLE_PALETTE: DesignSystemPalette = {
  "light": {
    "primary": "#0071e3",
    "onPrimary": "#ffffff",
    "warning": "#ff9500"
  },
  "dark": {
    "primary": "#2997ff",
    "onPrimary": "#161616",
    "hover": "#4aa8ff",
    "warning": "#ff9f0a"
  }
};
