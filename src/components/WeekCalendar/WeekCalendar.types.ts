import { EventsByCategory } from "../WeekCalendarRow/WeekCalendarRow.types";

export type WeekCalendarProps = {
  title?: string;
  events?: EventsByCategory[];
};