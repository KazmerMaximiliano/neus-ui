import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type DrawerHeaderProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type DrawerHeaderStoryArgs = DrawerHeaderProps & {
  readonly designSystem: DesignSystemId;
};
