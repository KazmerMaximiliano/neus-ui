import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { InputProps } from "../Input";
import type { SelectOption } from "../Select";

export type ComboboxProps = Omit<
  InputProps,
  "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step" | "role" | "ref"
> & {
  /** Suggestions; pass the results yourself with filter={false} when they come from a server. */
  readonly options: readonly SelectOption[];
  /** The chosen option's value, or the typed text with allowCustomValue. */
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onChange?: (value: string) => void;
  /** The text in the field, controlled; use it to fetch suggestions. */
  readonly inputValue?: string;
  readonly onInputChange?: (text: string) => void;
  /** Narrows the options to the typed text; turn it off when the options are already results. */
  readonly filter?: boolean;
  /** Keeps text that matches no option as the value instead of restoring the last choice. */
  readonly allowCustomValue?: boolean;
  readonly loading?: boolean;
  readonly emptyLabel?: string;
  readonly loadingLabel?: string;
  readonly listClassName?: string;
  readonly listStyle?: CSSProperties;
  readonly optionClassName?: string;
  readonly optionStyle?: CSSProperties;
  readonly statusClassName?: string;
  readonly statusStyle?: CSSProperties;
};

export type ComboboxStoryArgs = ComboboxProps & {
  readonly designSystem: DesignSystemId;
};
