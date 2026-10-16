import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { SelectOption } from "../Select";

export type MultiSelectProps = {
  name: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  label?: string;
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  viewSearchBar?: boolean;
  searchBarPlaceholder?: string;
  fieldStyle?: CSSProperties;
  tagStyle?: CSSProperties;
  listStyle?: CSSProperties;
  optionStyle?: CSSProperties;
  onChange?: (values: string[]) => void;
};

export type MultiSelectStoryArgs = MultiSelectProps & {
  designSystem: DesignSystemId;
};
