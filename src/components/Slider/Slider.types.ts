import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input";

export type SliderLabels = {
  /** Name of the lower thumb of a range. */
  readonly minimum?: string;
  /** Name of the upper thumb of a range. */
  readonly maximum?: string;
};

type SliderBaseProps = FieldDescriptionProps & {
  readonly label: ReactNode;
  readonly error?: ReactNode;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly disabled?: boolean;
  /** Submitted with the value; a range submits both values under this name. */
  readonly name?: string;
  readonly showValue?: boolean;
  /** Marks every step on the track; for a few steps (up to 100). */
  readonly showSteps?: boolean;
  readonly locale?: string;
  /** How the value reads: currency, percent, unit. */
  readonly formatOptions?: Intl.NumberFormatOptions;
  /** Built-in texts, in the project's language. */
  readonly labels?: SliderLabels;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  readonly valueClassName?: string;
  readonly valueStyle?: CSSProperties;
  readonly controlClassName?: string;
  readonly controlStyle?: CSSProperties;
  readonly trackClassName?: string;
  readonly trackStyle?: CSSProperties;
  readonly fillClassName?: string;
  readonly fillStyle?: CSSProperties;
  /** Both stretches of the track outside the value. */
  readonly railClassName?: string;
  readonly railStyle?: CSSProperties;
  /** Every step mark. */
  readonly stepClassName?: string;
  readonly stepStyle?: CSSProperties;
  readonly inputClassName?: string;
  readonly inputStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly errorStyle?: CSSProperties;
};

type SliderSingleProps = {
  readonly range?: false;
  readonly value?: number;
  readonly defaultValue?: number;
  readonly onChange?: (value: number) => void;
};

type SliderRangeProps = {
  readonly range: true;
  readonly value?: readonly [number, number];
  readonly defaultValue?: readonly [number, number];
  readonly onChange?: (value: [number, number]) => void;
};

/** Native `<div>` attributes (id, aria-*, data-*…) and its ref, on the root. */
type SliderNativeProps = Omit<
  ComponentPropsWithRef<"div">,
  keyof SliderBaseProps | keyof SliderRangeProps | "children" | "dangerouslySetInnerHTML"
>;

export type SliderProps = SliderBaseProps & SliderNativeProps & (SliderSingleProps | SliderRangeProps);

export type SliderStoryArgs = SliderBaseProps & {
  readonly designSystem: DesignSystemId;
  readonly range: boolean;
  readonly value?: number;
  readonly upperValue?: number;
  readonly onChange?: (value: number | [number, number]) => void;
};
