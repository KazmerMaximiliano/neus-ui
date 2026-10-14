import "./Card.styles.css";
import type { CardProps } from "./Card.types";

export const Card = ({
  children,
  className,
  style = null,
  ...props
}: CardProps) => (
  <div
    {...props}
    className={["card", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
