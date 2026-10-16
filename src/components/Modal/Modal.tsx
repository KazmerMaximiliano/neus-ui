import { useCallback, useEffect, useId, useRef } from "react";
import "./Modal.styles.css";
import type { ModalProps } from "./Modal.types";
import { ModalTitleContext } from "./ModalContext";

export const Modal = ({
  isOpen = false,
  onClose,
  children,
  className,
  style = null,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const setRef = useCallback(
    (node: HTMLDialogElement | null) => {
      dialogRef.current = node;
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const opener = dialog.ownerDocument.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (opener?.isConnected) opener.focus();
    };
  }, [isOpen]);

  return (
    <dialog
      {...props}
      ref={setRef}
      className={["modal", className].filter(Boolean).join(" ")}
      style={style ?? undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? ariaLabelledBy : (ariaLabelledBy ?? titleId)}
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
      onClick={(event) => {
        props.onClick?.(event);
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <ModalTitleContext.Provider value={titleId}>
        {isOpen && children}
      </ModalTitleContext.Provider>
    </dialog>
  );
};
