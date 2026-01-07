export interface MultiSelectProps {
    name: string;
    options: {
        value: string;
        label: string;
    }[];
    error?: string;
    placeholder?: string;
    label?: string;
    value?: string[];
    disabled?: boolean;
    onChange?: (values: string[]) => void;
}
