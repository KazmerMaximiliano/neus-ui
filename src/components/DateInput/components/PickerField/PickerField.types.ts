import type { CSSProperties, ReactNode } from "react";
import type { IconButtonIcon } from "../../../IconButton";
import type { FieldPresentationProps } from "../../../Input/Input.types";

export type PickerFieldProps = FieldPresentationProps & {
  panelStyle?: CSSProperties;
  prefix: string;
  icon: IconButtonIcon;
  label?: string;
  placeholder?: string;
  displayValue?: string;
  pickerLabel: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  hiddenValue: string;
  fieldStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  children: (close: () => void) => ReactNode;
};
