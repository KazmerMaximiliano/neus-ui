import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ModalFooterProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  style?: CSSProperties | null;
};

export type ModalFooterStoryArgs = ModalFooterProps & {
  designSystem: DesignSystemId;
};
