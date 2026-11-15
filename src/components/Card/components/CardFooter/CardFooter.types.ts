import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type CardFooterProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type CardFooterStoryArgs = CardFooterProps & {
  readonly designSystem: DesignSystemId;
};
