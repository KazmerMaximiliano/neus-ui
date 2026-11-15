import type { CSSProperties } from "react";
import type { DateRange, Formatters, Labels } from "react-day-picker";
import type { DesignSystemId } from "../../design-systems";

export type YearRange = { readonly from: number; readonly to: number; };

type CalendarBaseProps = {
  readonly overlayYearIconClassName?: string;
  readonly overlayYearIconStyle?: CSSProperties;
  readonly captionClassName?: string;
  readonly captionStyle?: CSSProperties;
  readonly className?: string;
  readonly dayPickerClassName?: string;
  readonly dayPickerStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly infoClassName?: string;
  readonly infoStyle?: CSSProperties;
  readonly labelClassName?: string;
  readonly labelWrapperClassName?: string;
  readonly labelWrapperStyle?: CSSProperties;
  readonly monthGridClassName?: string;
  readonly monthGridStyle?: CSSProperties;
  readonly monthItemClassName?: string;
  readonly monthItemStyle?: CSSProperties;
  readonly overlayClassName?: string;
  readonly overlayHeaderClassName?: string;
  readonly overlayHeaderStyle?: CSSProperties;
  readonly overlayStyle?: CSSProperties;
  readonly overlayYearBtnClassName?: string;
  readonly overlayYearBtnStyle?: CSSProperties;
  readonly requiredClassName?: string;
  readonly requiredStyle?: CSSProperties;
  readonly yearItemClassName?: string;
  readonly yearItemStyle?: CSSProperties;
  readonly yearListClassName?: string;
  readonly yearListStyle?: CSSProperties;
  readonly language?: string;
  readonly name?: string;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly numberOfMonths?: number;
  readonly error?: string;
  readonly yearRange?: YearRange;
  readonly calendarStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
};

export type CalendarProps = CalendarBaseProps & (
  | { readonly mode?: "single"; readonly value?: Date; readonly defaultValue?: Date; readonly onChange?: (value: Date | undefined) => void; }
  | { readonly mode: "range"; readonly value?: DateRange; readonly defaultValue?: DateRange; readonly onChange?: (value: DateRange | undefined) => void; }
  | { readonly mode: "multiple"; readonly value?: readonly Date[]; readonly defaultValue?: readonly Date[]; readonly onChange?: (value: Date[] | undefined) => void; }
);

export type CalendarSelection = Date | readonly Date[] | DateRange | undefined;
export type CalendarPickerView = "calendar" | "month" | "year";
export type CalendarCaptionCustomization = {
  readonly captionClassName?: string;
  readonly captionStyle?: CSSProperties;
};
export type CalendarLocalization = {
  language: string;
  monthNames: string[];
  formatYear: (date: Date) => string;
  formatters: Partial<Formatters>;
  labels: Partial<Labels>;
};
export type CalendarStoryArgs = CalendarProps & { readonly designSystem: DesignSystemId; };
