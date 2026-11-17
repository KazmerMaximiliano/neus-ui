import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps, FieldPresentationProps } from "../Input";

export type SelectOption = {
  readonly value?: string | null;
  readonly label: string;
};

export type SelectProps = FieldPresentationProps & FieldDescriptionProps & {
  readonly placeholderClassName?: string;
  readonly placeholderStyle?: CSSProperties;
  readonly caretClassName?: string;
  readonly caretStyle?: CSSProperties;
  readonly className?: string;
  readonly emptyClassName?: string;
  readonly emptyStyle?: CSSProperties;
  readonly errorMessageClassName?: string;
  readonly errorMessageStyle?: CSSProperties;
  readonly fieldClassName?: string;
  readonly labelClassName?: string;
  readonly labelStyle?: CSSProperties;
  /** Marks the field as required: an asterisk after the label and aria-required. The app validates. */
  readonly required?: boolean;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly listClassName?: string;
  readonly listContentClassName?: string;
  readonly listContentStyle?: CSSProperties;
  readonly optionCheckClassName?: string;
  readonly optionCheckStyle?: CSSProperties;
  readonly optionClassName?: string;
  readonly optionLabelClassName?: string;
  readonly optionLabelStyle?: CSSProperties;
  readonly panelClassName?: string;
  readonly panelStyle?: CSSProperties;
  readonly searchClassName?: string;
  readonly searchInputClassName?: string;
  readonly searchInputStyle?: CSSProperties;
  readonly searchStyle?: CSSProperties;
  readonly valueClassName?: string;
  readonly valueStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly triggerClassName?: string;
  readonly triggerStyle?: CSSProperties;
  readonly options: readonly SelectOption[];
  readonly name?: string;
  readonly value?: string;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly label?: string;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly viewSearchBar?: boolean;
  readonly searchBarPlaceholder?: string;
  readonly fieldStyle?: CSSProperties;
  readonly listStyle?: CSSProperties;
  readonly optionStyle?: CSSProperties;
  readonly onChange?: (value: string) => void;
};

export type SelectStoryArgs = SelectProps & {
  readonly designSystem: DesignSystemId;
};
