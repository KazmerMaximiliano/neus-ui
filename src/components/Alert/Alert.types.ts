import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type AlertStatus = "info" | "success" | "warning" | "error";
/** How assistive technology hears the alert: assertive interrupts, polite waits, off stays silent. */
export type AlertLive = "assertive" | "polite" | "off";

type AlertDismiss =
  | {
    /** Shows a close button that calls this. */
    readonly onDismiss: () => void;
    /** Accessible name of the close button, in the project's language. */
    readonly dismissLabel: string;
  }
  | { readonly onDismiss?: never; readonly dismissLabel?: never };

export type AlertProps = Omit<ComponentPropsWithRef<"div">, "title" | "role"> & AlertDismiss & {
  readonly status?: AlertStatus;
  readonly title?: ReactNode;
  /** Buttons or links placed under the message. */
  readonly actions?: ReactNode;
  /** Replaces the status icon; null removes it. */
  readonly icon?: ReactNode | null;
  readonly live?: AlertLive;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly contentClassName?: string;
  readonly contentStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
  readonly dismissClassName?: string;
  readonly dismissStyle?: CSSProperties;
};

export type AlertStoryArgs = Omit<AlertProps, "onDismiss" | "dismissLabel"> & {
  readonly dismissible: boolean;
  readonly dismissLabel: string;
  readonly onDismiss?: () => void;
  readonly designSystem: DesignSystemId;
};
