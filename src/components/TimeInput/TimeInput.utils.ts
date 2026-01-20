import { TimeValue } from "../Clock/Clock.types";

export const serializeTimeValue = (value: TimeValue | undefined): string => {
  return value
    ? `${value.hours.toString().padStart(2, "0")}:${value.minutes
      .toString()
      .padStart(2, "0")}`
    : "";
};
