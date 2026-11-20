import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type DrawerContentProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type DrawerContentStoryArgs = DrawerContentProps & {
  readonly designSystem: DesignSystemId;
};
