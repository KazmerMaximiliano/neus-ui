export const toLength = (size: number | string | undefined) =>
  typeof size === "number" ? `${size}px` : size;
