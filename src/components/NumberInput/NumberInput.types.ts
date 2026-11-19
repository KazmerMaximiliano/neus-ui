import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { InputProps } from "../Input";

export type NumberInputLabels = {
  readonly increment?: string;
  readonly decrement?: string;
};

export type NumberInputProps = Omit<
  InputProps,
  | "value"
  | "defaultValue"
  | "onChange"
  | "type"
  | "min"
  | "max"
  | "step"
  | "role"
  | "inputMode"
  | "suffix"
  | "suffixClassName"
  | "suffixStyle"
> & {
  /** The number, controlled; `null` leaves the field empty. */
  readonly value?: number | null;
  readonly defaultValue?: number | null;
  /** Called with the settled number (clamped and rounded), or `null` when the field is cleared. */
  readonly onChange?: (value: number | null) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  /** The jump for Page Up and Page Down; ten steps by default. */
  readonly largeStep?: number;
  /** Decimals kept; the decimals of `step` by default. */
  readonly precision?: number;
  /** The locale that formats and reads the number. */
  readonly locale?: string;
  /** Intl options for currency, percent or units, shown while the field is not being edited. */
  readonly formatOptions?: Intl.NumberFormatOptions;
  readonly hideStepper?: boolean;
  readonly labels?: NumberInputLabels;
  readonly stepperClassName?: string;
  readonly stepperStyle?: CSSProperties;
  readonly incrementClassName?: string;
  readonly incrementStyle?: CSSProperties;
  readonly decrementClassName?: string;
  readonly decrementStyle?: CSSProperties;
};

export type NumberInputStoryArgs = NumberInputProps & {
  readonly designSystem: DesignSystemId;
};
