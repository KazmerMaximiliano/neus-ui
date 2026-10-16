import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SelectOption = {
  value?: string | null;
  label: string;
};

export type SelectProps = {
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
