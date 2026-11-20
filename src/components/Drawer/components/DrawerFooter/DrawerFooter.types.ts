import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type DrawerFooterProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type DrawerFooterStoryArgs = DrawerFooterProps & {
  readonly designSystem: DesignSystemId;
};
