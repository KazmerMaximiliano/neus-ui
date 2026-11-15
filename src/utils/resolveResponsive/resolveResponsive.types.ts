/** One value for every viewport, or one per breakpoint: base, md (768px and up) and lg (1024px and up). */
export type Responsive<T> = T | { base: T; md?: T; lg?: T };
