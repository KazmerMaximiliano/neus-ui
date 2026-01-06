export interface RGB {
  r: number;
  g: number;
  b: number;
}

export const hexToRgb = (hex: string): RGB | null => {
  const cleanHex = hex.replace('#', '');

  if (!/^[0-9A-F]{6}$/i.test(cleanHex)) {
    return null;
  }

  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);

  return { r, g, b };
};