import { TimeValue } from "./Clock.types";
export declare const getDisplayHours: ({ format, currentValue, }: {
    format?: "12h" | "24h";
    currentValue: TimeValue;
}) => number;
export declare const getHandAngle: ({ mode, format, currentValue, }: {
    mode: "hours" | "minutes";
    format?: "12h" | "24h";
    currentValue: TimeValue;
}) => number;
export declare const getHandLength: ({ mode, format, currentValue, }: {
    mode: "hours" | "minutes";
    format?: "12h" | "24h";
    currentValue: TimeValue;
}) => 100 | 60;
export declare const serializeTimeValue: (time: TimeValue) => string;
