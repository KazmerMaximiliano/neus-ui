import type { DesignSystemId, DesignSystemPalette } from "./design-systems.types";

export const DESIGN_SYSTEM_PALETTES: Record<DesignSystemId, DesignSystemPalette> = {
  neus: {
    light: { primary: "#283593", onPrimary: "#ffffff", hover: "#1c258c" },
    dark: { primary: "#a5b4fc", onPrimary: "#161616", hover: "#c7d2fe" },
  },
  apple: {
    light: { primary: "#0071e3", onPrimary: "#ffffff" },
    dark: { primary: "#2997ff", onPrimary: "#161616" },
  },
  carbon: {
    light: {
      primary: "#0f62fe", onPrimary: "#ffffff", hover: "#0353e9",
      active: "#002d9c", error: "#da1e28",
    },
    dark: { primary: "#78a9ff", onPrimary: "#161616", error: "#ff8389" },
  },
  material: {
    light: { primary: "#6442d6", onPrimary: "#ffffff" },
    dark: { primary: "#c8b3fd", onPrimary: "#161616" },
  },
  neobrutalism: {
    light: { primary: "#fdc800", onPrimary: "#1c293c", focus: "#432dd7" },
    dark: { primary: "#fdc800", onPrimary: "#1c293c", focus: "#c8b3fd" },
  },
  vercel: {
    light: { primary: "#171717", onPrimary: "#ffffff", focus: "#0072f5" },
    dark: { primary: "#ededed", onPrimary: "#171717", focus: "#52a8ff" },
  },
};
