import { useCallback, useEffect, useId, useRef } from "react";
import { DrawerTitleContext } from "./Drawer.context";
import type { DrawerProps } from "./Drawer.types";
import { isOutside, tabbables } from "./Drawer.utils";
import "./Drawer.styles.css";

/** A modal panel that slides in from an edge of the screen. */
export const Drawer = ({
  isOpen = false,
  onClose,
  side = "end",
  children,
  className,
  style = null,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onKeyDown,
  onPointerDown,
  onClick,
  ...props
}: DrawerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOutside = useRef(false);
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
      className={["drawer", className].filter(Boolean).join(" ")}
      style={style ?? undefined}
      data-side={side}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? ariaLabelledBy : (ariaLabelledBy ?? titleId)}
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
      onClose={(event) => {
        // Closed by something else than this component, such as a form with method="dialog".
        if (isOpen && !event.currentTarget.open) onClose?.();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.key !== "Tab" || event.defaultPrevented) return;
        // Tab wraps inside the drawer instead of leaving for the browser's controls.
        const items = tabbables(event.currentTarget);
        const active = event.currentTarget.ownerDocument.activeElement;
        if (event.shiftKey && (active === items[0] || active === event.currentTarget)) {
          event.preventDefault();
          items.at(-1)?.focus();
        } else if (!event.shiftKey && active === items.at(-1)) {
          event.preventDefault();
          items[0]?.focus();
        }
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        pointerStartedOutside.current =
          event.target === event.currentTarget &&
          isOutside(event.currentTarget, event.clientX, event.clientY);
      }}
      onClick={(event) => {
        onClick?.(event);
        // Only a press that starts and ends on the backdrop closes, never a drag out of the panel.
        if (
          pointerStartedOutside.current &&
          event.target === event.currentTarget &&
          isOutside(event.currentTarget, event.clientX, event.clientY)
        )
          onClose?.();
        pointerStartedOutside.current = false;
      }}
    >
      <DrawerTitleContext.Provider value={titleId}>{children}</DrawerTitleContext.Provider>
    </dialog>
  );
};
