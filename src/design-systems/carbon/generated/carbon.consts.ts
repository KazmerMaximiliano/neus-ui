/* Generated from src/design-systems/carbon/DESIGN.md. Edit the document, then run pnpm design:generate. */
import type { DesignSystemPalette } from "../../design-systems.types";

export const CARBON_METADATA = {
  "id": "carbon",
  "name": "Carbon",
  "description": "Square corners, vivid blue, and precise spacing.",
  "source": "src/design-systems/carbon/DESIGN.md"
} as const;

export const CARBON_PALETTE: DesignSystemPalette = {
  "light": {
    "primary": "#0f62fe",
    "onPrimary": "#ffffff",
    "hover": "#0353e9",
    "active": "#002d9c",
    "error": "#da1e28",
    "warning": "#f1c21b"
  },
  "dark": {
    "primary": "#78a9ff",
    "onPrimary": "#161616",
    "error": "#ff8389",
    "warning": "#f1c21b"
  }
};
