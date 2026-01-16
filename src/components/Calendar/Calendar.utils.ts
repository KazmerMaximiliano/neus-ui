import type { DateRange } from "react-day-picker";
import { DayPickerPropsType } from "./Calendar.types";

export const serializeValue = (
  val: Date | Date[] | DateRange | undefined,
): string => {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString();
  if (Array.isArray(val)) return val.map((d) => d.toISOString()).join(",");
  if ("from" in val) {
    return `${val.from?.toISOString() || ""},${val.to?.toISOString() || ""}`;
  }
  return "";
};

export const getDayPickerProps = (
  mode: string,
  currentValue: Date | DateRange | Date[] | undefined,
  required: boolean,
): DayPickerPropsType => {
  if (mode === "single") {
    return {
      mode: "single",
      selected: currentValue as Date,
      required: required as boolean,
    };
  }

  if (mode === "range") {
    return {
      mode: "range",
      selected: currentValue as DateRange,
      required: true,
    };
  }

  if (mode === "multiple") {
    return {
      mode: "multiple",
      selected: currentValue as Date[],
      required: true,
    };
  }

  return {
    mode: "single",
    selected: currentValue as Date,
    required: required as boolean,
  };
};
