import type { CSSProperties } from "react";
import type { DateRange } from "react-day-picker";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input";

export type DateInputLabels = {
  /** Name of the calendar panel, given the field's label when it has one. */
  readonly calendar?: (label?: string) => string;
};

export type DateInputProps = FieldPresentationProps & FieldDescriptionProps & {
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
  readonly value?: Date | DateRange;
  readonly defaultValue?: Date | DateRange;
  readonly name?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly error?: string;
  readonly mode?: "single" | "range";
  readonly fieldStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
  readonly onChange?: (value: Date | DateRange | undefined) => void;
  /** Built-in texts, in the project's language. */
  readonly labels?: DateInputLabels;
  /** BCP 47 tag for the shown date and the calendar, such as "es-AR"; en-US when omitted or unsupported. */
  readonly language?: string;
};

export type DateInputStoryArgs = DateInputProps & {
  readonly designSystem: DesignSystemId;
};
