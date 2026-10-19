import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type AlertStatus = "info" | "success" | "warning" | "error";
/** How assistive technology hears the alert: assertive interrupts, polite waits, off stays silent. */
export type AlertLive = "assertive" | "polite" | "off";

type AlertDismiss =
  | {
    /** Shows a close button that calls this. */
    onDismiss: () => void;
    /** Accessible name of the close button, in the project's language. */
    dismissLabel: string;
  }
  | { onDismiss?: never; dismissLabel?: never };

export type AlertProps = Omit<ComponentPropsWithRef<"div">, "title" | "role"> & AlertDismiss & {
  status?: AlertStatus;
  title?: ReactNode;
  /** Buttons or links placed under the message. */
  actions?: ReactNode;
  /** Replaces the status icon; null removes it. */
  icon?: ReactNode | null;
  live?: AlertLive;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
  dismissClassName?: string;
  dismissStyle?: CSSProperties;
};

export type AlertStoryArgs = Omit<AlertProps, "onDismiss" | "dismissLabel"> & {
  dismissible: boolean;
  dismissLabel: string;
  onDismiss?: () => void;
  designSystem: DesignSystemId;
};
