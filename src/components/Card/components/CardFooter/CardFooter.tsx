import type { CardFooterProps } from "./CardFooter.types";
import "./CardFooter.styles.css";

export const CardFooter = ({
  children,
  className,
  style = null,
  ...props
}: CardFooterProps) => (
  <div
    {...props}
    className={["card-footer", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
