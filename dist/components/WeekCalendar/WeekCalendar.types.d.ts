import { CalendarEvent, EventsByCategory } from "../WeekCalendarRow/WeekCalendarRow.types";
export type WeekCalendarProps = {
    title?: string;
    events?: EventsByCategory[];
    hoverContent?: (event: CalendarEvent) => React.ReactNode;
    onEventClick?: (event: CalendarEvent) => void;
    onDayChange?: (weekStart: Date, weekEnd: Date) => void;
};
