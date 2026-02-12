import { CalendarEvent, DayCellType } from "./WeekCalendarRow.types";
export declare const getDayCellInfo: (day: Date, events: CalendarEvent[]) => {
    type: DayCellType;
    event: CalendarEvent | null;
    durationDays: number;
};
