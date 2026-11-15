import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type CheckboxProps = {
  readonly checkboxClassName?: string;
  readonly className?: string;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly inputClassName?: string;
  readonly inputStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly style?: CSSProperties;
  readonly name?: string;
  readonly value?: string;
  readonly label?: string;
  readonly checked?: boolean;
  readonly indeterminate?: boolean;
  readonly disabled?: boolean;
  readonly checkboxStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly onChange?: (checked: boolean) => void;
};

export type CheckboxStoryArgs = CheckboxProps & {
  readonly designSystem: DesignSystemId;
};
