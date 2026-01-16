import type { DateRange, Mode } from "react-day-picker";

export type CalendarMode = Mode;

export type CalendarProps = {
  mode?: CalendarMode;
  selected?: Date | Date[] | DateRange;
  locale?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  error?: string;
  onSelect?: (value: Date | Date[] | DateRange | undefined) => void;
};