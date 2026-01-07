export type InputProps = {
    name?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'color' | 'date' | 'datetime-local' | 'month' | 'tel' | 'time' | 'url' | 'week';
    min?: string | number;
    max?: string | number;
    step?: string | number;
    onChange?: (value: string) => void;
};
