import type { DateRange } from "react-day-picker";
import { DayPickerPropsType } from "./Calendar.types";
export declare const serializeValue: (val: Date | Date[] | DateRange | undefined) => string;
export declare const getDayPickerProps: (mode: string, currentValue: Date | DateRange | Date[] | undefined, required: boolean) => DayPickerPropsType;
