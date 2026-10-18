import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import { TimeValue } from "../Clock/Clock.types";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input/Input.types";

export type TimeInputProps = FieldPresentationProps & FieldDescriptionProps & {
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
  value?: TimeValue;
  defaultValue?: TimeValue;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  format?: "12h" | "24h";
  fieldStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  onChange?: (value: TimeValue | undefined) => void;
};

export type TimeInputStoryArgs = TimeInputProps & {
  designSystem: DesignSystemId;
};
