import { CalendarEvent, EventsByCategory } from "../WeekCalendarRow/WeekCalendarRow.types";
export type WeekCalendarProps = {
    title?: string;
    events?: EventsByCategory[];
    hoverContent?: React.ReactNode;
    onEventClick?: (event: CalendarEvent) => void;
    onDayChange?: (weekStart: Date, weekEnd: Date) => void;
};
