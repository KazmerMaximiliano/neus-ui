import { useContext } from "react";
import { ModalTitleContext } from "../../ModalContext";
import type { ModalHeaderProps } from "./ModalHeader.types";
import "./ModalHeader.styles.css";

export const ModalHeader = ({
  children,
  className,
  style = null,
  ...props
}: ModalHeaderProps) => {
  const titleId = useContext(ModalTitleContext);
  return (
    <div
      id={titleId}
      {...props}
      className={["modal-header", className].filter(Boolean).join(" ")}
      style={style ?? undefined}
    >
      {children}
    </div>
  );
};
