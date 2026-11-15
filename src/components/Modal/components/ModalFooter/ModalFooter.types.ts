import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ModalFooterProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type ModalFooterStoryArgs = ModalFooterProps & {
  readonly designSystem: DesignSystemId;
};
