import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FieldDescriptionProps } from "../Input/Input.types";

export type SelectOption = {
  value?: string | null;
  label: string;
};

export type SelectProps = FieldDescriptionProps & {
  placeholderClassName?: string;
  placeholderStyle?: CSSProperties;
  caretClassName?: string;
  caretStyle?: CSSProperties;
  className?: string;
  emptyClassName?: string;
  emptyStyle?: CSSProperties;
  errorMessageClassName?: string;
  errorMessageStyle?: CSSProperties;
  fieldClassName?: string;
  labelClassName?: string;
  labelStyle?: CSSProperties;
  /** Marks the field as required: an asterisk after the label and aria-required. The app validates. */
  required?: boolean;
  requiredClassName?: string;
  requiredStyle?: CSSProperties;
  listClassName?: string;
  listContentClassName?: string;
  listContentStyle?: CSSProperties;
  optionCheckClassName?: string;
  optionCheckStyle?: CSSProperties;
  optionClassName?: string;
  optionLabelClassName?: string;
  optionLabelStyle?: CSSProperties;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  searchClassName?: string;
  searchInputClassName?: string;
  searchInputStyle?: CSSProperties;
  searchStyle?: CSSProperties;
  valueClassName?: string;
  valueStyle?: CSSProperties;
  style?: CSSProperties;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  options: SelectOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  viewSearchBar?: boolean;
  searchBarPlaceholder?: string;
  fieldStyle?: CSSProperties;
  listStyle?: CSSProperties;
  optionStyle?: CSSProperties;
  onChange?: (value: string) => void;
};

export type SelectStoryArgs = SelectProps & {
  designSystem: DesignSystemId;
};
