import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { CalendarEvent, EventsByCategory } from "./components/WeekCalendarRow";

export type WeekCalendarLabels = {
  /** Accessible name of the button that shows the previous week. */
  readonly previous?: string;
  /** Accessible name of the button that shows the next week. */
  readonly next?: string;
};

export type WeekCalendarProps = {
  readonly dateRangeClassName?: string;
  readonly dateRangeStyle?: CSSProperties;
  readonly categoryClassName?: string;
  readonly eventClassName?: string;
  readonly tooltipClassName?: string;
  readonly dayNameClassName?: string;
  readonly dayNameStyle?: CSSProperties;
  readonly dayNumberClassName?: string;
  readonly dayNumberStyle?: CSSProperties;
  readonly gridClassName?: string;
  readonly headerCategoryCellClassName?: string;
  readonly headerCategoryCellStyle?: CSSProperties;
  readonly headerClassName?: string;
  readonly headerDayCellClassName?: string;
  readonly headerDayCellStyle?: CSSProperties;
  readonly headerRowClassName?: string;
  readonly headerRowStyle?: CSSProperties;
  readonly navigationClassName?: string;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly navigationStyle?: CSSProperties;
  readonly gridStyle?: CSSProperties;
  readonly categoryStyle?: CSSProperties;
  readonly eventStyle?: CSSProperties;
  readonly tooltipStyle?: CSSProperties;
  readonly title?: string;
  readonly events?: readonly EventsByCategory[];
  readonly hoverContent?: (event: CalendarEvent) => React.ReactNode;
  readonly onEventClick?: (event: CalendarEvent) => void;
  readonly onDayChange?: (weekStart: Date, weekEnd: Date) => void;
  /** Built-in texts, in the project's language. */
  readonly labels?: WeekCalendarLabels;
  /** BCP 47 tag for the day names and dates, such as "es-AR"; en-US when omitted or unsupported. */
  readonly language?: string;
};
export type WeekCalendarStoryArgs = WeekCalendarProps & {
  readonly designSystem: DesignSystemId;
};
