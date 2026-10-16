import "./Card.styles.css";
import type { CardProps } from "./Card.types";

export const Card = ({
  children,
  className,
  style = null,
  variant = "auto",
  ...props
}: CardProps) => (
  <div
    {...props}
    data-variant={variant}
    className={["card", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
