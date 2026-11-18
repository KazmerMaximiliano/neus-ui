import type { CSSProperties, ReactNode } from "react";
import type { AlertStatus } from "../../components/Alert";

export type ToastPlacement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export type ToastLive = "polite" | "assertive";

export type ToastOptions = {
  readonly status?: AlertStatus;
  readonly title?: ReactNode;
  readonly message?: ReactNode;
  /** Buttons or links under the message; as a function it receives a callback that closes the toast. */
  readonly actions?: ReactNode | ((dismiss: () => void) => ReactNode);
  /** Milliseconds on screen; null keeps it until it is dismissed. Defaults to the provider's. */
  readonly duration?: number | null;
  /** assertive interrupts the screen reader: keep it for errors that block the task. */
  readonly live?: ToastLive;
  /** Accessible name of its close button; defaults to the provider's. */
  readonly dismissLabel?: string;
};

export type ToastApi = {
  /** Shows a toast and returns its id. */
  readonly show: (toast: ToastOptions) => string;
  readonly dismiss: (id: string) => void;
};

export type ToastEntry = ToastOptions & {
  readonly id: string;
};

export type ToastProviderProps = {
  readonly children?: ReactNode;
  readonly placement?: ToastPlacement;
  /** Toasts on screen at once; older ones wait until a newer one closes. */
  readonly max?: number;
  readonly duration?: number | null;
  /** Accessible name of the notification region, in the project's language. */
  readonly label?: string;
  /** Accessible name of every close button, in the project's language. */
  readonly dismissLabel?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly listClassName?: string;
  readonly listStyle?: CSSProperties;
  readonly toastClassName?: string;
  readonly toastStyle?: CSSProperties;
};
