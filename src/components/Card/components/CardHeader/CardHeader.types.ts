import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type CardHeaderProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type CardHeaderStoryArgs = CardHeaderProps & {
  readonly designSystem: DesignSystemId;
};
