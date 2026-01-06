import { hexToRgb } from "./hexToRgb";
import { rgbToHex } from "./rgbToHex";

export const getLightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 + percent / 100;
  const r = Math.min(255, Math.round(rgb.r * factor));
  const g = Math.min(255, Math.round(rgb.g * factor));
  const b = Math.min(255, Math.round(rgb.b * factor));

  return rgbToHex(r, g, b);
};