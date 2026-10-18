import type { CSSProperties } from "react";

/** One value for every viewport, or one per breakpoint: base, md (768px and up) and lg (1024px and up). */
export type Responsive<T> = T | { base: T; md?: T; lg?: T };

/**
 * Inline custom properties for a responsive prop: `name`, `name-md` and `name-lg`, always all three,
 * md inheriting base and lg inheriting md. The component stylesheet reads each one in its media query,
 * so the layout changes in CSS and works in server rendering and islands.
 */
export const resolveResponsive = <T>(
  name: string,
  value: Responsive<T> | undefined,
  format: (value: T) => string,
): CSSProperties => {
  if (value === undefined) return {};
  const { base, md = base, lg = md } = typeof value === "object" && value !== null && "base" in value
    ? value
    : { base: value as T };
  return { [name]: format(base), [`${name}-md`]: format(md), [`${name}-lg`]: format(lg) } as CSSProperties;
};
