import type { ModalContentProps } from "./ModalContent.types";
import "./ModalContent.styles.css";

export const ModalContent = ({
  children,
  className,
  style = null,
  ...props
}: ModalContentProps) => (
  <div
    {...props}
    className={["modal-content", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
