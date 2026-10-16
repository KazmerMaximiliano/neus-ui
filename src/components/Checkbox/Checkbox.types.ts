import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type CheckboxProps = {
  checkboxClassName?: string;
  className?: string;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  labelClassName?: string;
  style?: CSSProperties;
  name?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  checkboxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  onChange?: (checked: boolean) => void;
};

export type CheckboxStoryArgs = CheckboxProps & {
  designSystem: DesignSystemId;
};
