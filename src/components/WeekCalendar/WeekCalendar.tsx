import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../IconButton/IconButton";
import { WeekCalendarRow } from "./components/WeekCalendarRow/WeekCalendarRow";
import "./WeekCalendar.styles.css";
import { WeekCalendarProps } from "./WeekCalendar.types";
import { CATEGORY_COLORS, DAY_NAMES } from "./WeekCalendar.consts";
import { formatDate, getCenterDate, getWeekDays } from "./WeekCalendar.utils";

export const WeekCalendar = ({
  dateRangeClassName,
  dateRangeStyle,
  categoryClassName,
  eventClassName,
  tooltipClassName,
  dayNameClassName,
  dayNameStyle,
  dayNumberClassName,
  dayNumberStyle,
  gridClassName,
  headerCategoryCellClassName,
  headerCategoryCellStyle,
  headerClassName,
  headerDayCellClassName,
  headerDayCellStyle,
  headerRowClassName,
  headerRowStyle,
  navigationClassName,
  titleClassName,
  titleStyle,
  className,
  style,
  headerStyle,
  navigationStyle,
  gridStyle,
  categoryStyle,
  eventStyle,
  tooltipStyle,
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

  const navigate = (offset: number) => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + offset);
    const end = new Date(next);
    end.setDate(end.getDate() + 6);
    setWeekStart(next);
    onDayChange?.(next, end);
  };

  return (
    <div
      className={["week-calendar", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div
        className={["week-calendar__header", headerClassName]
          .filter(Boolean)
          .join(" ")}
        style={headerStyle}
      >
        <div
          className={["week-calendar__title", titleClassName]
            .filter(Boolean)
            .join(" ")}
          style={titleStyle}
        >
          {title}
        </div>
        <div
          className={["week-calendar__selector", navigationClassName]
            .filter(Boolean)
            .join(" ")}
          style={navigationStyle}
        >
          <IconButton
            size="small"
            variant="text"
            icon={ChevronLeft}
            label="Anterior"
            onClick={() => navigate(-1)}
          />
          <span
            className={["week-calendar__date-range", dateRangeClassName]
              .filter(Boolean)
              .join(" ")}
            style={dateRangeStyle}
          >
            {formatDate(weekStart)} - {formatDate(weekEnd)}
          </span>
          <IconButton
            size="small"
            variant="text"
            icon={ChevronRight}
            label="Siguiente"
            onClick={() => navigate(1)}
          />
        </div>
      </div>
      <div
        className={["week-calendar__grid", gridClassName]
          .filter(Boolean)
          .join(" ")}
        style={gridStyle}
      >
        <div
          className={["week-calendar-row", headerRowClassName]
            .filter(Boolean)
            .join(" ")}
          style={headerRowStyle}
        >
          <div
            className={[
              "week-calendar-row__category-cell",
              headerCategoryCellClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={headerCategoryCellStyle}
          ></div>
          {days.map((day) => {
            const isToday = day.getTime() === today.getTime();
            return (
              <div
                aria-current={isToday ? "date" : undefined}
                key={day.toISOString()}
                className={[
                  `week-calendar-row__day-cell${isToday ? " week-calendar__day-cell--today" : ""}`,
                  headerDayCellClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={headerDayCellStyle}
              >
                <span
                  className={["week-calendar__day-name", dayNameClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={dayNameStyle}
                >
                  {DAY_NAMES[day.getDay()]}
                </span>
                <span
                  className={["week-calendar__day-number", dayNumberClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={dayNumberStyle}
                >
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>
        {events.map((entry, index) => (
          <WeekCalendarRow
            categoryClassName={categoryClassName}
            eventClassName={eventClassName}
            tooltipClassName={tooltipClassName}
            categoryStyle={categoryStyle}
            eventStyle={eventStyle}
            tooltipStyle={tooltipStyle}
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
