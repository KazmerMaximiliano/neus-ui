import type { DateRange } from "react-day-picker";
export declare const formatDateForDisplay: (value: Date | DateRange | undefined, mode?: "single" | "range") => string;
export declare const serializeDateValue: (val: Date | DateRange | undefined) => string;
export declare const isDateRange: (value: Date | DateRange | undefined) => value is DateRange;
