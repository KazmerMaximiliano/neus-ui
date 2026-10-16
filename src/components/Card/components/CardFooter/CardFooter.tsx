import "./CardFooter.styles.css";
import type { CardFooterProps } from "./CardFooter.types";

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
