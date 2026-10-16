import "./ModalFooter.styles.css";
import type { ModalFooterProps } from "./ModalFooter.types";

export const ModalFooter = ({
  children,
  className,
  style = null,
  ...props
}: ModalFooterProps) => (
  <div
    {...props}
    className={["modal-footer", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
