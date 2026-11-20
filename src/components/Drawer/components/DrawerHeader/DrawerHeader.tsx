import { useContext } from "react";
import { DrawerTitleContext } from "../../Drawer.context";
import type { DrawerHeaderProps } from "./DrawerHeader.types";
import "./DrawerHeader.styles.css";

/** The drawer's title row; inside a Drawer it names the dialog. */
export const DrawerHeader = ({ children, className, style = null, ...props }: DrawerHeaderProps) => {
  const titleId = useContext(DrawerTitleContext);
  return (
    <div
      id={titleId}
      {...props}
      className={["drawer-header", className].filter(Boolean).join(" ")}
      style={style ?? undefined}
    >
      {children}
    </div>
  );
};
