import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

/** The edge a drawer slides from; start and end follow the writing direction. */
export type DrawerSide = "start" | "end" | "top" | "bottom";

export type DrawerProps = Omit<
  ComponentPropsWithRef<"dialog">,
  "open" | "onClose" | "onCancel" | "style"
> & {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly side?: DrawerSide;
  readonly style?: CSSProperties | null;
};

export type DrawerStoryArgs = DrawerProps & {
  readonly designSystem: DesignSystemId;
};
