export type DayCellType = "empty" | "single" | "start" | "continue" | "end";
export type DayCellInfo = {
    type: DayCellType;
    event: CalendarEvent | null;
    durationDays: number;
};
export type EventsByCategory = {
    category: Category;
    events: CalendarEvent[];
};
export type Category = {
    color?: string;
    title: string;
    label: string;
};
export type CalendarEvent = {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    description?: string;
};
export type WeekCalendarRowProps = {
    entry: EventsByCategory;
    days: Date[];
    color: string;
    hoverContent?: (event: CalendarEvent) => React.ReactNode;
    onEventClick?: (event: CalendarEvent) => void;
};
