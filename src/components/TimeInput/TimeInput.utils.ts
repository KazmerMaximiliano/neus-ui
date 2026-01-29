import { TimeValue } from "../Clock/Clock.types";

export const serializeTimeValue = (
  value: TimeValue | undefined,
  format: "12h" | "24h" = "24h",
): string => {
  if (!value) return "";

  const minutes = value.minutes.toString().padStart(2, "0");

  if (format === "12h") {
    const period = value.hours >= 12 ? "PM" : "AM";
    const displayHours = value.hours % 12 || 12;
    return `${displayHours.toString().padStart(2, "0")}:${minutes} ${period}`;
  }

  return `${value.hours.toString().padStart(2, "0")}:${minutes}`;
};
