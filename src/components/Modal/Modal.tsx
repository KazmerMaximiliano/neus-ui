import { Button } from "../Button/Button";
import "./Modal.styles.css";
import { ModalProps } from "./Modal.types";

export const Modal = ({
  isOpen = false,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonColor = "primary",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal__backdrop" onClick={onCancel}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal__header">
            <h3>{title}</h3>
          </div>
        )}

        {children && <div className="modal__body">{children}</div>}

        {(onConfirm || onCancel) && (
          <div className="modal__footer">
            {onCancel && <Button label={cancelText} onClick={onCancel} />}
            {onConfirm && (
              <Button
                color={confirmButtonColor}
                label={confirmText}
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
