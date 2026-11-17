/* Generated from src/design-systems/material/DESIGN.md. Edit the document, then run pnpm design:generate. */
import type { DesignSystemPalette } from "../../design-systems.types";

export const MATERIAL_METADATA = {
  "id": "material",
  "name": "Material",
  "description": "Primary purple, rounded shapes, and subtle elevation.",
  "source": "src/design-systems/material/DESIGN.md"
} as const;

export const MATERIAL_PALETTE: DesignSystemPalette = {
  "light": {
    "primary": "#6750a4",
    "onPrimary": "#ffffff",
    "error": "#b3261e"
  },
  "dark": {
    "primary": "#d0bcff",
    "onPrimary": "#381e72",
    "error": "#f2b8b5"
  }
};
