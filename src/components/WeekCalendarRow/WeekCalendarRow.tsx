import { CATEGORY_COLORS_HEX } from "./WeekCalendarRow.constants";
import "./WeekCalendarRow.styles.css";
import { WeekCalendarRowProps } from "./WeekCalendarRow.types";
import { getDayCellInfo } from "./WeekCalendarRow.utils";

export const WeekCalendarRow = ({
  entry,
  days,
  color,
}: WeekCalendarRowProps) => {
  return (
    <div className="week-calendar-row">
      <div className={`week-calendar-lodging-cell with-point ${color}`}>
        <p className="week-calendar-lodging-name">{entry.category.title}</p>
        <p className="week-calendar-lodging-info">{entry.category.label}</p>
      </div>
      {days.map((day) => {
        const { type, event, durationDays } = getDayCellInfo(day, entry.events);
        const initial = event?.title?.charAt(0).toUpperCase() ?? "?";
        const showDetails = durationDays > 2;
        const showContent = type === "single" || type === "start";

        return (
          <div key={day.toISOString()} className="week-calendar-day-cell">
            {type !== "empty" && (
              <div
                className={`reservation-${type}`}
                style={{ backgroundColor: CATEGORY_COLORS_HEX[color] }}
              />
            )}
            {showContent && (
              <div
                className="reservation-content"
                style={
                  showDetails
                    ? { width: `calc(${durationDays} * 100%)` }
                    : undefined
                }
              >
                <span className="reservation-avatar">{initial}</span>
                {showDetails && event && (
                  <div className="reservation-info">
                    <span className="reservation-guest-name">
                      {event.title}
                    </span>
                    {event.description && (
                      <span className="reservation-guest-count">
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
    </div>
  );
};
