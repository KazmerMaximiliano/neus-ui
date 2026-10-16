import "./Badge.styles.css";
import { BadgeProps } from "./Badge.types";

export const Badge = ({
  label,
  variant = "solid",
  color = "neutral",
  badgeStyle,
  dotStyle,
}: BadgeProps) => (
  <span
    className={`badge badge--${variant} badge--${color}`}
    style={badgeStyle}
  >
    {variant === "dot" && (
      <span className="badge__dot" style={dotStyle} aria-hidden />
    )}
    {label}
  </span>
);
