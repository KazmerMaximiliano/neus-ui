import type { DateRange } from "react-day-picker";
export type DateInputProps = {
    value?: Date | DateRange;
    defaultValue?: Date | DateRange;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    mode?: "single" | "range";
    onChange?: (value: Date | DateRange | undefined) => void;
};
