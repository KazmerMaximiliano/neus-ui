import { useState } from "react";
import { CATEGORY_COLORS_HEX } from "./WeekCalendarRow.constants";
import "./WeekCalendarRow.styles.css";
import { WeekCalendarRowProps } from "./WeekCalendarRow.types";
import { getDayCellInfo } from "./WeekCalendarRow.utils";

export const WeekCalendarRow = ({
  entry,
  days,
  color,
  hoverContent,
  onEventClick,
}: WeekCalendarRowProps) => {
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    setHoverPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
  };

  return (
    <div className="week-calendar-row">
      <div className={`week-calendar-category-cell with-point ${color}`}>
        <p className="week-calendar-category-name">{entry.category.title}</p>
        <p className="week-calendar-category-info">{entry.category.label}</p>
      </div>
      {days.map((day) => {
        const { type, event, durationDays } = getDayCellInfo(day, entry.events);
        const initial = event?.title?.charAt(0).toUpperCase() ?? "?";
        const showDetails = durationDays > 2;
        const showContent = type === "single" || type === "start";
        const hasEvent = type !== "empty";

        return (
          <div
            key={day.toISOString()}
            className={`week-calendar-day-cell${hasEvent && onEventClick ? " clickable" : ""}`}
            onMouseMove={hasEvent && hoverContent ? handleMouseMove : undefined}
            onMouseLeave={
              hasEvent && hoverContent ? handleMouseLeave : undefined
            }
            onClick={
              hasEvent && onEventClick && event
                ? () => onEventClick(event)
                : undefined
            }
          >
            {hasEvent && (
              <div
                className={`event-${type}`}
                style={{ backgroundColor: CATEGORY_COLORS_HEX[color] }}
              />
            )}
            {showContent && (
              <div
                className="event-content"
                style={
                  showDetails
                    ? { width: `calc(${durationDays} * 100%)` }
                    : undefined
                }
              >
                <span className="event-avatar">{initial}</span>
                {showDetails && event && (
                  <div className="event-info">
                    <span className="event-title">
                      {event.title}
                    </span>
                    {event.description && (
                      <span className="event-description">
                        {event.description}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {hoverContent && hoverPos && (
        <div
          className="week-calendar-hover-tooltip"
          style={{ left: hoverPos.x, top: hoverPos.y }}
        >
          {hoverContent}
        </div>
      )}
    </div>
  );
};
