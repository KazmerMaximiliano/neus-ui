import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ListProps = Omit<ComponentPropsWithRef<"ul">, "style"> & {
  /** `ol` when the order of the rows matters. */
  readonly as?: "ul" | "ol";
  /** Rules between the rows instead of space. */
  readonly divided?: boolean;
  readonly style?: CSSProperties;
};

export type ListStoryArgs = ListProps & {
  readonly designSystem: DesignSystemId;
};
