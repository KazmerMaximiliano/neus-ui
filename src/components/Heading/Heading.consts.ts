import type { HeadingLevel, HeadingSize } from "./Heading.types";

/** Default visual size of each document level. */
export const HEADING_SIZES: Record<HeadingLevel, HeadingSize> = {
  h1: "xl",
  h2: "lg",
  h3: "md",
  h4: "sm",
  h5: "xs",
  h6: "xs",
};
