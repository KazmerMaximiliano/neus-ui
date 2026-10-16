import type { MapCoordinates } from "./InteractiveMap.types";

export const parseCoordinates = (value?: string): MapCoordinates | null => {
  if (value === undefined) return null;
  const parts = value.split(",");
  if (parts.length !== 2 || parts.some((part) => !part.trim())) return null;
  const [lat, lng] = parts.map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
    ? { lat, lng } : null;
};
