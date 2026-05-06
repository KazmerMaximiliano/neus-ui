import "./Badge.styles.css";
import { BadgeProps } from "./Badge.types";

export const Badge = ({
  label,
  variant = "solid",
  color = "neutral",
}: BadgeProps) => {
  const classes = `badge badge--${variant} badge--${color}`;
  return (
    <span className={classes}>
      {variant === "dot" && <span className="badge__dot" />}
      {label}
    </span>
  );
};
