import type { ComponentPropsWithRef } from "react";
import type { DesignSystemId } from "../../design-systems";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "display" | "xl" | "lg" | "md" | "sm" | "xs";
export type HeadingAlign = "start" | "center" | "end";

export type HeadingProps = ComponentPropsWithRef<"h2"> & {
  /** Document level, independent of the visual size. */
  as?: HeadingLevel;
  /** Visual size; follows the level by default. `display` is for the main headline of a public page. */
  size?: HeadingSize;
  align?: HeadingAlign;
  /** Evens out line lengths with `text-wrap: balance`. */
  balance?: boolean;
};

export type HeadingStoryArgs = HeadingProps & { designSystem: DesignSystemId };
