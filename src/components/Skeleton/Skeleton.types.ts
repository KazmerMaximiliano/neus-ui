import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SkeletonVariant = "text" | "rect" | "circle";

export type SkeletonProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  /** Lines of text, a block (media, card, field) or a circle (avatar). */
  readonly variant?: SkeletonVariant;
  /** Number of text lines; the last one is shorter when there are several. */
  readonly lines?: number;
  /** CSS length or a number of pixels. */
  readonly width?: number | string;
  /** CSS length or a number of pixels; a circle takes its width when omitted. */
  readonly height?: number | string;
  readonly lineClassName?: string;
  readonly lineStyle?: CSSProperties;
};

export type SkeletonStoryArgs = SkeletonProps & {
  readonly designSystem: DesignSystemId;
};
