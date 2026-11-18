import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type ProgressSize = "small" | "medium" | "large";

export type ProgressProps = Omit<ComponentPropsWithRef<"div">, "children" | "role"> & {
  /** Omit it while the share is unknown: the bar becomes indeterminate. */
  readonly value?: number;
  readonly min?: number;
  readonly max?: number;
  /** Visible text that names the bar; without it, name the bar with aria-label or aria-labelledby. */
  readonly label?: string;
  /** Shows valueText, or the percentage, beside the label. */
  readonly showValue?: boolean;
  /** The value in words ("3 of 8 files"): announced instead of the percentage and shown by showValue. */
  readonly valueText?: string;
  readonly size?: ProgressSize;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly valueClassName?: string;
  readonly valueStyle?: CSSProperties;
  readonly trackClassName?: string;
  readonly trackStyle?: CSSProperties;
  readonly fillClassName?: string;
  readonly fillStyle?: CSSProperties;
};

export type ProgressStoryArgs = ProgressProps & {
  readonly designSystem: DesignSystemId;
};
