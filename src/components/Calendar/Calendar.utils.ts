import type { DateRange } from "react-day-picker";
import { DEFAULT_LANGUAGE, MONTH_COUNT, MONTH_REFERENCE_YEAR } from "./Calendar.consts";
import type { CalendarLocalization } from "./Calendar.types";

const resolveLanguage = (language: string): string => {
  try {
    return Intl.DateTimeFormat.supportedLocalesOf(language)[0] ?? DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

export const getCalendarLocalization = (language = DEFAULT_LANGUAGE): CalendarLocalization => {
  const locale = resolveLanguage(language);
  const month = new Intl.DateTimeFormat(locale, { month: "long", calendar: "gregory" });
  const caption = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", calendar: "gregory" });
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short", calendar: "gregory" });
  const weekdayLabel = new Intl.DateTimeFormat(locale, { weekday: "long", calendar: "gregory" });
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", calendar: "gregory" });
  const dateLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full", calendar: "gregory" });
  const year = new Intl.DateTimeFormat(locale, { year: "numeric", calendar: "gregory" });
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  return {
    language: locale,
    monthNames: Array.from({ length: MONTH_COUNT }, (_, index) => month.format(new Date(MONTH_REFERENCE_YEAR, index, 1))),
    formatYear: year.format,
    formatters: {
      formatCaption: caption.format,
      formatWeekdayName: weekday.format,
      formatDay: day.format,
    },
    labels: {
      labelNav: () => relative.format(0, "month"),
      labelGrid: caption.format,
      labelWeekday: weekdayLabel.format,
      labelDayButton: (date, modifiers) => modifiers.today
        ? `${relative.format(0, "day")}, ${dateLabel.format(date)}`
        : dateLabel.format(date),
      labelPrevious: () => relative.format(-1, "month"),
      labelNext: () => relative.format(1, "month"),
    },
  };
};

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
