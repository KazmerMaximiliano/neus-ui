import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ModalHeaderProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type ModalHeaderStoryArgs = ModalHeaderProps & {
  readonly designSystem: DesignSystemId;
};
