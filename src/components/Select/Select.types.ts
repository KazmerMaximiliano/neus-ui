import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SelectOption = {
  value?: string | null;
  label: string;
};

export type SelectProps = {
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
