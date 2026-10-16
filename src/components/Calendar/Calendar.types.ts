import type { CSSProperties } from "react";
import type { DateRange, Formatters, Labels } from "react-day-picker";
import type { DesignSystemId } from "../../design-systems";

export type YearRange = { from: number; to: number; };

type CalendarBaseProps = {
  overlayYearIconClassName?: string;
  overlayYearIconStyle?: CSSProperties;
  captionClassName?: string;
  captionStyle?: CSSProperties;
  className?: string;
  dayPickerClassName?: string;
  dayPickerStyle?: CSSProperties;
  errorClassName?: string;
  infoClassName?: string;
  infoStyle?: CSSProperties;
  labelClassName?: string;
  labelWrapperClassName?: string;
  labelWrapperStyle?: CSSProperties;
  monthGridClassName?: string;
  monthGridStyle?: CSSProperties;
  monthItemClassName?: string;
  monthItemStyle?: CSSProperties;
  overlayClassName?: string;
  overlayHeaderClassName?: string;
  overlayHeaderStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  overlayYearBtnClassName?: string;
  overlayYearBtnStyle?: CSSProperties;
  requiredClassName?: string;
  requiredStyle?: CSSProperties;
  yearItemClassName?: string;
  yearItemStyle?: CSSProperties;
  yearListClassName?: string;
  yearListStyle?: CSSProperties;
  language?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  numberOfMonths?: number;
  error?: string;
  yearRange?: YearRange;
  calendarStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  errorStyle?: CSSProperties;
};

export type CalendarProps = CalendarBaseProps & (
  | { mode?: "single"; value?: Date; defaultValue?: Date; onChange?: (value: Date | undefined) => void; }
  | { mode: "range"; value?: DateRange; defaultValue?: DateRange; onChange?: (value: DateRange | undefined) => void; }
  | { mode: "multiple"; value?: Date[]; defaultValue?: Date[]; onChange?: (value: Date[] | undefined) => void; }
);

export type CalendarSelection = Date | Date[] | DateRange | undefined;
export type CalendarPickerView = "calendar" | "month" | "year";
export type CalendarCaptionCustomization = {
  captionClassName?: string;
  captionStyle?: CSSProperties;
};
export type CalendarLocalization = {
  language: string;
  monthNames: string[];
  formatYear: (date: Date) => string;
  formatters: Partial<Formatters>;
  labels: Partial<Labels>;
};
export type CalendarStoryArgs = CalendarProps & { designSystem: DesignSystemId; };
