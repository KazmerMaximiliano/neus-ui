import "./ModalContent.styles.css";
import type { ModalContentProps } from "./ModalContent.types";

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
