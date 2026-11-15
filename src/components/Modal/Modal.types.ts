import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ModalProps = Omit<
  ComponentPropsWithRef<"dialog">,
  "open" | "onClose" | "onCancel" | "style"
> & {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly style?: CSSProperties | null;
};

export type ModalStoryArgs = ModalProps & {
  readonly designSystem: DesignSystemId;
};
