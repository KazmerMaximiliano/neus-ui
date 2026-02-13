export type SelectOption = {
  value?: string | null;
  label: string;
};
export interface MultiSelectProps {
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
  onChange?: (values: string[]) => void;
}
