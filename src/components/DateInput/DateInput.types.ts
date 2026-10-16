import type { CSSProperties } from "react";
import type { DateRange } from "react-day-picker";
import type { DesignSystemId } from "../../design-systems";
import type { FieldPresentationProps } from "../Input/Input.types";

export type DateInputProps = FieldPresentationProps & {
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
