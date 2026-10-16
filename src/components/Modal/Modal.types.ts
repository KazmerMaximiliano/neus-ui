import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ModalProps = Omit<
  ComponentPropsWithRef<"dialog">,
  "open" | "onClose" | "onCancel" | "style"
> & {
  isOpen?: boolean;
  onClose?: () => void;
  style?: CSSProperties | null;
};

export type ModalStoryArgs = ModalProps & {
  designSystem: DesignSystemId;
};
