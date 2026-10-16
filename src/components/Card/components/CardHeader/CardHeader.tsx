import "./CardHeader.styles.css";
import type { CardHeaderProps } from "./CardHeader.types";

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
