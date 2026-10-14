import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type CardProps = Omit<
  ComponentPropsWithRef<"div">,
  "style" | "title" | "color" | "onClick"
> & {
  style?: CSSProperties | null;
};

export type CardStoryArgs = CardProps & {
  designSystem: DesignSystemId;
};
