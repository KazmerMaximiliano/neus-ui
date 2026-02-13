import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../IconButton/IconButton";
import { WeekCalendarRow } from "../WeekCalendarRow/WeekCalendarRow";
import { CATEGORY_COLORS, DAY_NAMES } from "./WeekCalendar.constants";
import "./WeekCalendar.styles.css";
import { WeekCalendarProps } from "./WeekCalendar.types";
import { formatDate, getCenterDate, getWeekDays } from "./WeekCalendar.utils";

export const WeekCalendar = ({
  title = "Calendar",
  events = [],
  hoverContent,
  onEventClick,
  onDayChange,
}: WeekCalendarProps) => {
  const [weekStart, setWeekStart] = useState<Date>(() =>
    getCenterDate(new Date()),
  );

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const days = getWeekDays(weekStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goToPreviousDay = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      const end = new Date(d);
      end.setDate(end.getDate() + 6);
      onDayChange?.(d, end);
      return d;
    });
  };

  const goToNextDay = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      const end = new Date(d);
      end.setDate(end.getDate() + 6);
      onDayChange?.(d, end);
      return d;
    });
  };

  return (
    <div className="week-calendar-container">
      <div className="week-calendar-header">
        <div className="week-calendar-title">{title}</div>
        <div className="week-selector">
          <IconButton
            size="small"
            variant="text"
            icon={ChevronLeft}
            onClick={goToPreviousDay}
          />
          <span>
            {formatDate(weekStart)} - {formatDate(weekEnd)}
          </span>
          <IconButton
            size="small"
            variant="text"
            icon={ChevronRight}
            onClick={goToNextDay}
          />
        </div>
      </div>
      <div className="week-calendar">
        <div className="week-calendar-row">
          <div className="week-calendar-category-cell"></div>
          {days.map((day) => {
            const isToday = day.getTime() === today.getTime();
            return (
              <div
                key={day.toISOString()}
                className={`week-calendar-day-cell${isToday ? " week-calendar-day-today" : ""}`}
              >
                <span className="week-calendar-day-name">
                  {DAY_NAMES[day.getDay()]}
                </span>
                <span className="week-calendar-day-number">
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>
        {events.map((entry, index) => (
          <WeekCalendarRow
            key={entry.category.title}
            entry={entry}
            days={days}
            color={
              entry.category.color ??
              CATEGORY_COLORS[index % CATEGORY_COLORS.length]
            }
            hoverContent={hoverContent}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};
