import type { CardHeaderProps } from "./CardHeader.types";
import "./CardHeader.styles.css";

export const CardHeader = ({
  children,
  className,
  style = null,
  ...props
}: CardHeaderProps) => (
  <div
    {...props}
    className={["card-header", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
