import { TimeValue } from "./ClockNumbers.types";

export const getDisplayHours = ({
  format,
  currentValue,
}: {
  format?: "12h" | "24h";
  currentValue: TimeValue;
}) => {
  if (format === "24h") return currentValue.hours;
  const h = currentValue.hours % 12;
  return h === 0 ? 12 : h;
};
