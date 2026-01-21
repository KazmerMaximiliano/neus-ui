import { TimeValue } from "../Clock/Clock.types";
export type TimeInputProps = {
    value?: TimeValue;
    defaultValue?: TimeValue;
    name?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    readonly?: boolean;
    format?: "12h" | "24h";
    onChange?: (value: TimeValue | undefined) => void;
};
