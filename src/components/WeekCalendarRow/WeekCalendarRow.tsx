import { useState } from "react";
import "./WeekCalendarRow.styles.css";
import { CalendarEvent, WeekCalendarRowProps } from "./WeekCalendarRow.types";
import { getDayCellInfo, resolveColor } from "./WeekCalendarRow.utils";

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
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setHoverPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
    setHoveredEvent(null);
  };

  const resolvedColor = resolveColor(color);

  return (
    <div className="week-calendar-row">
      <div
        className="week-calendar-row__category-cell week-calendar-row__category-cell--with-point"
        style={{ "--category-dot-color": resolvedColor } as React.CSSProperties}
      >
        <p className="week-calendar-row__category-name">{entry.category.title}</p>
        <p className="week-calendar-row__category-info">{entry.category.label}</p>
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
            className={`week-calendar-row__day-cell${hasEvent && onEventClick ? " week-calendar-row__day-cell--clickable" : ""}`}
            onMouseMove={
              hasEvent && hoverContent && event
                ? (e) => { handleMouseMove(e); setHoveredEvent(event); }
                : undefined
            }
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
                className={`week-calendar-row__event--${type}`}
                style={{ backgroundColor: resolvedColor }}
              />
            )}
            {showContent && (
              <div
                className="week-calendar-row__event-content"
                style={
                  showDetails
                    ? { width: `calc(${durationDays} * 100%)` }
                    : undefined
                }
              >
                <span className="week-calendar-row__event-avatar">{initial}</span>
                {showDetails && event && (
                  <div className="week-calendar-row__event-info">
                    <span className="week-calendar-row__event-title">
                      {event.title}
                    </span>
                    {event.description && (
                      <span className="week-calendar-row__event-description">
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
      {hoverContent && hoverPos && hoveredEvent && (
        <div
          className="week-calendar-row__hover-tooltip"
          style={{ left: hoverPos.x, top: hoverPos.y }}
        >
          {hoverContent(hoveredEvent)}
        </div>
      )}
    </div>
  );
};
