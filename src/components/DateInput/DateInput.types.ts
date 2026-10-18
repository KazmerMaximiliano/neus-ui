import type { CSSProperties } from "react";
import type { DateRange } from "react-day-picker";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input/Input.types";

export type DateInputProps = FieldPresentationProps & FieldDescriptionProps & {
  placeholderClassName?: string;
  placeholderStyle?: CSSProperties;
  className?: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  errorClassName?: string;
  fieldClassName?: string;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  labelClassName?: string;
  panelClassName?: string;
  requiredClassName?: string;
  requiredStyle?: CSSProperties;
  style?: CSSProperties;
  valueClassName?: string;
  valueStyle?: CSSProperties;
  panelStyle?: CSSProperties;
  value?: Date | DateRange;
  defaultValue?: Date | DateRange;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: string;
  mode?: "single" | "range";
  fieldStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  onChange?: (value: Date | DateRange | undefined) => void;
};

export type DateInputStoryArgs = DateInputProps & {
  designSystem: DesignSystemId;
};
