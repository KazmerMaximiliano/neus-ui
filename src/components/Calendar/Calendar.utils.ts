import type { DateRange } from "react-day-picker";

export const formatDate = (
  date: Date | undefined,
  locale: string = "en-US"
): string => {
  if (!date) return "";

  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateRange = (
  range: DateRange | undefined,
  locale: string = "en-US"
): string => {
  if (!range || (!range.from && !range.to)) return "";

  if (range.from && !range.to) return formatDate(range.from, locale);

  if (range.from && range.to) {
    return `${formatDate(range.from, locale)} - ${formatDate(
      range.to,
      locale
    )}`;
  }
  
  return "";
};