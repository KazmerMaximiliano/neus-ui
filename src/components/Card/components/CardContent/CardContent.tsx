import type { CardContentProps } from "./CardContent.types";
import "./CardContent.styles.css";

export const CardContent = ({
  children,
  className,
  style = null,
  ...props
}: CardContentProps) => (
  <div
    {...props}
    className={["card-content", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
