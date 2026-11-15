import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ModalContentProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type ModalContentStoryArgs = ModalContentProps & {
  readonly designSystem: DesignSystemId;
};
