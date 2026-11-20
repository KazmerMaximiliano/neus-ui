import type { DrawerContentProps } from "./DrawerContent.types";
import "./DrawerContent.styles.css";

export const DrawerContent = ({ children, className, style = null, ...props }: DrawerContentProps) => (
  <div
    {...props}
    className={["drawer-content", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
