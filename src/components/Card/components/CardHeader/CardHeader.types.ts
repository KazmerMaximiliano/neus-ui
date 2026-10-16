import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type CardHeaderProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  style?: CSSProperties | null;
};

export type CardHeaderStoryArgs = CardHeaderProps & {
  designSystem: DesignSystemId;
};
