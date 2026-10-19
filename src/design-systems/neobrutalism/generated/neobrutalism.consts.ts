/* Generated from src/design-systems/neobrutalism/DESIGN.md. Edit the document, then run pnpm design:generate. */
import type { DesignSystemPalette } from "../../design-systems.types";

export const NEOBRUTALISM_METADATA = {
  "id": "neobrutalism",
  "name": "Neobrutalism",
  "description": "Bright yellow, thick borders, and hard shadows.",
  "source": "src/design-systems/neobrutalism/DESIGN.md"
} as const;

export const NEOBRUTALISM_PALETTE: DesignSystemPalette = {
  "light": {
    "primary": "#fdc800",
    "onPrimary": "#1c293c",
    "focus": "#432dd7",
    "error": "#e11d48",
    "warning": "#ff6b00"
  },
  "dark": {
    "primary": "#fdc800",
    "onPrimary": "#1c293c",
    "focus": "#c8b3fd",
    "error": "#ff6b6b",
    "warning": "#ff9a3c"
  }
};
