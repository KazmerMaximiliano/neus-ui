import { TimeValue } from "./ClockNumbers.types";
export declare const getDisplayHours: ({ format, currentValue, }: {
    format?: "12h" | "24h";
    currentValue: TimeValue;
}) => number;
