import { CalendarEvent, DayCellType } from "./WeekCalendarRow.types";

export const getDayCellInfo = (
  day: Date,
  events: CalendarEvent[],
): { type: DayCellType; event: CalendarEvent | null; durationDays: number } => {
  const dayTime = day.getTime();

  for (const event of events) {
    const start = new Date(event.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(event.end);
    end.setHours(0, 0, 0, 0);

    if (dayTime < start.getTime() || dayTime > end.getTime()) continue;

    const isStart = dayTime === start.getTime();
    const isEnd = dayTime === end.getTime();

    const durationDays =
      Math.round((end.getTime() - start.getTime()) / 86400000) + 1;

    let type: DayCellType;
    if (isStart && isEnd) type = "single";
    else if (isStart) type = "start";
    else if (isEnd) type = "end";
    else type = "continue";

    return { type, event, durationDays };
  }

  return { type: "empty", event: null, durationDays: 0 };
}