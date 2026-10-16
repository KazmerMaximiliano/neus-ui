import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import { TimeValue } from "../Clock/Clock.types";
import type { FieldPresentationProps } from "../Input/Input.types";

export type TimeInputProps = FieldPresentationProps & {
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
