import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type FieldPresentationProps = {
  variant?: "auto" | "filled" | "outlined";
  labelPlacement?: "auto" | "external" | "floating";
  size?: "small" | "medium" | "large";
};

export type InputProps = FieldPresentationProps & {
  className?: string;
  controlClassName?: string;
  controlStyle?: CSSProperties;
  errorClassName?: string;
  errorIconClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  prefixClassName?: string;
  requiredClassName?: string;
  suffixClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorIcon?: ReactNode;
  prefixStyle?: CSSProperties;
  suffixStyle?: CSSProperties;
  errorIconStyle?: CSSProperties;
  id?: string;
  "aria-label"?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  type?: "text" | "password" | "email" | "number" | "color" | "tel" | "url";
  min?: string | number;
  max?: string | number;
  step?: string | number;
  wrapperStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  requiredStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  onChange?: (value: string) => void;
};

export type InputStoryArgs = InputProps & {
  designSystem: DesignSystemId;
};

export type InputStoryState = {
  value: InputProps["value"];
  argsValue: InputProps["value"];
  pendingValues: string[];
};

export type InputStoryPreviewProps = InputStoryArgs & {
  updateArgs: (args: Partial<InputStoryArgs>) => void;
};
