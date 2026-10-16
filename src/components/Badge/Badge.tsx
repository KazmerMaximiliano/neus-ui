import "./Badge.styles.css";
import { BadgeProps } from "./Badge.types";

export const Badge = ({
  className,
  dotClassName,
  label,
  variant = "solid",
  color = "neutral",
  badgeStyle,
  dotStyle,
}: BadgeProps) => (
  <span
    className={[`badge badge--${variant} badge--${color}`, className]
      .filter(Boolean)
      .join(" ")}
    style={badgeStyle}
  >
    {variant === "dot" && (
      <span
        className={["badge__dot", dotClassName].filter(Boolean).join(" ")}
        style={dotStyle}
        aria-hidden
      />
    )}
    {label}
  </span>
);
