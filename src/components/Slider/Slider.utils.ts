export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Where a value sits between min and max, from 0 to 1. */
export const shareOf = (value: number, min: number, max: number) =>
  (clamp(value, min, max) - min) / (max - min || 1);

/** Where each reachable value sits on the track, from 0 to 1. */
export const stepShares = (min: number, max: number, step: number) => {
  const count = step > 0 ? Math.floor((max - min) / step + 1e-9) : 0;
  return Array.from({ length: count + 1 }, (_, index) => shareOf(min + index * step, min, max));
};
