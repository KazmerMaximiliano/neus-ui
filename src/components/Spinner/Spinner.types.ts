import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SpinnerVariant = "ring" | "dots";
export type SpinnerSize = "small" | "medium" | "large";

export type SpinnerProps = Omit<ComponentPropsWithRef<"span">, "children" | "role"> & {
  readonly label?: string;
  readonly variant?: SpinnerVariant;
  readonly size?: SpinnerSize;
  readonly ringClassName?: string;
  readonly ringStyle?: CSSProperties;
  readonly dotClassName?: string;
  readonly dotStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
};

export type SpinnerStoryArgs = SpinnerProps & {
  readonly designSystem: DesignSystemId;
};
