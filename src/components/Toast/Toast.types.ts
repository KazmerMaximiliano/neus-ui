import type { DesignSystemId } from "../../design-systems";
import type { ToastPlacement } from "../../providers";
import type { AlertProps } from "../Alert";

export type ToastProps = AlertProps & {
  /** A toast never announces itself: the ToastProvider list it sits in is the live region. */
  readonly live?: never;
  /** Milliseconds before onDismiss runs; omitted or null keeps it open. Hover and focus pause it. */
  readonly duration?: number | null;
};

export type ToastStoryArgs = Omit<ToastProps, "onDismiss" | "dismissLabel"> & {
  readonly designSystem: DesignSystemId;
  readonly dismissLabel: string;
  readonly onDismiss?: () => void;
  readonly placement: ToastPlacement;
  readonly max: number;
};
