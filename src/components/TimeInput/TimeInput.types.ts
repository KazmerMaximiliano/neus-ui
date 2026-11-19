import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { ClockLabels, TimeValue } from "../Clock";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input";

export type TimeInputLabels = ClockLabels & {
  /** Name of the clock panel, given the field's label when it has one. */
  readonly clock?: (label?: string) => string;
};

export type TimeInputProps = FieldPresentationProps & FieldDescriptionProps & {
  readonly placeholderClassName?: string;
  readonly placeholderStyle?: CSSProperties;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly containerStyle?: CSSProperties;
  readonly dropdownClassName?: string;
  readonly dropdownStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly fieldClassName?: string;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly panelClassName?: string;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly valueClassName?: string;
  readonly valueStyle?: CSSProperties;
  readonly panelStyle?: CSSProperties;
  readonly value?: TimeValue;
  readonly defaultValue?: TimeValue;
  readonly name?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly format?: "12h" | "24h";
  /** Built-in texts, in the project's language. */
  readonly labels?: TimeInputLabels;
  readonly fieldStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
  readonly onChange?: (value: TimeValue | undefined) => void;
};

export type TimeInputStoryArgs = TimeInputProps & {
  readonly designSystem: DesignSystemId;
};
