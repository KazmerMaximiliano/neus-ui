import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type CardContentProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  readonly style?: CSSProperties | null;
};

export type CardContentStoryArgs = CardContentProps & {
  readonly designSystem: DesignSystemId;
};
