import type { DateRange } from "react-day-picker";

export type YearRange = {
  from: number;
  to: number;
};

export type CalendarProps = DayPickerPropsType & {
  value?: Date | Date[] | DateRange;
  defaultValue?: Date | Date[] | DateRange;
  name?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  error?: string;
  yearRange?: YearRange;
  onChange?: (value: Date | Date[] | DateRange | undefined) => void;
};

export type DayPickerPropsType =
  | { mode: "single"; selected: Date; required: boolean }
  | { mode: "range"; selected: DateRange; required: true }
  | { mode: "multiple"; selected: Date[]; required: true };
