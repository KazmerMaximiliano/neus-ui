import { TimeValue } from "./Clock.types";

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

export const getHandAngle = ({
  mode,
  format,
  currentValue,
}: {
  mode: "hours" | "minutes";
  format?: "12h" | "24h";
  currentValue: TimeValue;
}) => {
  if (mode === "hours") {
    if (format === "24h") {
      return (currentValue.hours % 12) * 30 - 90;
    }
    return (getDisplayHours({ format, currentValue }) % 12) * 30 - 90;
  }
  return currentValue.minutes * 6 - 90;
};

export const getHandLength = ({
  mode,
  format,
  currentValue,
}: {
  mode: "hours" | "minutes";
  format?: "12h" | "24h";
  currentValue: TimeValue;
}) => {
  if (mode === "hours" && format === "24h" && currentValue.hours < 12) {
    return 60;
  }
  return 100;
};

export const serializeTimeValue = (time: TimeValue): string => {
  const hours = time.hours.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
