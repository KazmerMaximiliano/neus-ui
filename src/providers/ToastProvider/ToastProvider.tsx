import { useMemo, useState } from "react";
import { Toast } from "../../components/Toast";
import { ToastContext } from "./ToastContext";
import type { ToastApi, ToastEntry, ToastProviderProps } from "./ToastProvider.types";
import { TOAST_DURATION, TOAST_LABELS, TOAST_LIVE, TOAST_MAX } from "./ToastProvider.consts";
import { createToastId } from "./ToastProvider.utils";
import "./ToastProvider.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

export const ToastProvider = ({
  children,
  placement = "bottom-end",
  max = TOAST_MAX,
  duration = TOAST_DURATION,
  label = TOAST_LABELS.region,
  dismissLabel = TOAST_LABELS.dismiss,
  className,
  style,
  listClassName,
  listStyle,
  toastClassName,
  toastStyle,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const api = useMemo<ToastApi>(() => ({
    show: (toast) => {
      const id = createToastId();
      setToasts((current) => [...current, { ...toast, id }]);
      return id;
    },
    dismiss: (id) => setToasts((current) => current.filter((toast) => toast.id !== id)),
  }), []);
  const shown = toasts.slice(-Math.max(1, max));

  return (
    <ToastContext.Provider value={api}>
      {children}
      <section
        className={join("toast-region", className)}
        style={style}
        data-placement={placement}
        aria-label={label}
      >
        {TOAST_LIVE.map((live) => (
          <ol key={live} className={join("toast-region__list", listClassName)} style={listStyle} aria-live={live}>
            {shown
              .filter((toast) => (toast.live ?? "polite") === live)
              .map(({ id, status, title, message, actions, duration: own, dismissLabel: ownLabel }) => {
                const close = () => api.dismiss(id);
                return (
                  <li key={id} className="toast-region__item">
                    <Toast
                      status={status}
                      title={title}
                      className={toastClassName}
                      style={toastStyle}
                      duration={own === undefined ? duration : own}
                      dismissLabel={ownLabel ?? dismissLabel}
                      onDismiss={close}
                      actions={typeof actions === "function" ? actions(close) : actions}
                    >
                      {message}
                    </Toast>
                  </li>
                );
              })}
          </ol>
        ))}
      </section>
    </ToastContext.Provider>
  );
};
