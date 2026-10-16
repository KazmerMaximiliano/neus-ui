import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ModalHeaderProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  style?: CSSProperties | null;
};

export type ModalHeaderStoryArgs = ModalHeaderProps & {
  designSystem: DesignSystemId;
};
