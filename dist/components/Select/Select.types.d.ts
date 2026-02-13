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
    onChange?: (value: string) => void;
};
