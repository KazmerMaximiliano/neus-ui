import "./CardContent.styles.css";
import type { CardContentProps } from "./CardContent.types";

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
