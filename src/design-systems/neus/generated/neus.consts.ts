/* Generated from src/design-systems/neus/DESIGN.md. Edit the document, then run pnpm design:generate. */
import type { DesignSystemPalette } from "../../design-systems.types";

export const NEUS_METADATA = {
  "id": "neus",
  "name": "Neus UI",
  "description": "The original Neus UI design and the fallback for all components.",
  "source": "src/design-systems/neus/DESIGN.md"
} as const;

export const NEUS_PALETTE: DesignSystemPalette = {
  "light": {
    "primary": "#283593",
    "onPrimary": "#ffffff",
    "hover": "#1c258c",
    "warning": "#ed6c02"
  },
  "dark": {
    "primary": "#a5b4fc",
    "onPrimary": "#161616",
    "hover": "#c7d2fe",
    "warning": "#ffa726"
  }
};
