import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import { CalendarEvent, EventsByCategory } from "./components/WeekCalendarRow/WeekCalendarRow.types";

export type WeekCalendarProps = {
  className?: string;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  navigationStyle?: CSSProperties;
  gridStyle?: CSSProperties;
  categoryStyle?: CSSProperties;
  eventStyle?: CSSProperties;
  tooltipStyle?: CSSProperties;
  title?: string;
  events?: EventsByCategory[];
  hoverContent?: (event: CalendarEvent) => React.ReactNode;
  onEventClick?: (event: CalendarEvent) => void;
  onDayChange?: (weekStart: Date, weekEnd: Date) => void;
};

/** Preview controls for the single WeekCalendar story; not additional component props. */
export type WeekCalendarStoryArgs = WeekCalendarProps & {
  designSystem: DesignSystemId;
};
