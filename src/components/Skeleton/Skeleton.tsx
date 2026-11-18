import type { CSSProperties } from "react";
import type { SkeletonProps } from "./Skeleton.types";
import { toLength } from "./Skeleton.utils";
import "./Skeleton.styles.css";

export const Skeleton = ({
  variant = "text",
  lines = 1,
  width,
  height,
  className,
  style,
  lineClassName,
  lineStyle,
  ...props
}: SkeletonProps) => (
  <span
    {...props}
    aria-hidden
    className={[`skeleton skeleton--${variant}`, className]
      .filter(Boolean)
      .join(" ")}
    // Sizes are runtime values, so they travel as custom properties the stylesheet reads.
    style={
      {
        "--skeleton-width": toLength(width),
        "--skeleton-height": toLength(height),
        ...style,
      } as CSSProperties
    }
  >
    {variant === "text" &&
      Array.from({ length: Math.max(1, lines) }, (_, line) => (
        <span
          key={line}
          className={["skeleton__line", lineClassName]
            .filter(Boolean)
            .join(" ")}
          style={lineStyle}
        />
      ))}
  </span>
);
