import type { DrawerFooterProps } from "./DrawerFooter.types";
import "./DrawerFooter.styles.css";

export const DrawerFooter = ({ children, className, style = null, ...props }: DrawerFooterProps) => (
  <div
    {...props}
    className={["drawer-footer", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
