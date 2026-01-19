import type { DateRange } from "react-day-picker";

export const formatDateForDisplay = (
  value: Date | DateRange | undefined,
  mode: "single" | "range" = "single",
): string => {
  if (!value) return "";

  if (mode === "range" && "from" in value) {
    const fromStr = value.from ? value.from.toLocaleDateString() : "";
    const toStr = value.to ? value.to.toLocaleDateString() : "";
    if (fromStr && toStr) return `${fromStr} - ${toStr}`;
    if (fromStr) return `${fromStr} - `;
    return "";
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return "";
};

export const serializeDateValue = (
  val: Date | DateRange | undefined,
): string => {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString();
  if ("from" in val) {
    return `${val.from?.toISOString() || ""},${val.to?.toISOString() || ""}`;
  }
  return "";
};

export const isDateRange = (
  value: Date | DateRange | undefined,
): value is DateRange => {
  return !!(value && typeof value === "object" && "from" in value);
};
