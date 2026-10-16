import { useId, useState, type CSSProperties } from "react";
import "./WeekCalendarRow.styles.css";
import { EventTooltip, WeekCalendarRowProps } from "./WeekCalendarRow.types";
import { getDayCellInfo, resolveColor } from "./WeekCalendarRow.utils";

export const WeekCalendarRow = ({
  categoryClassName,
  categoryInfoClassName,
  categoryInfoStyle,
  categoryNameClassName,
  categoryNameStyle,
  dayCellClassName,
  dayCellStyle,
  eventAvatarClassName,
  eventAvatarStyle,
  eventClassName,
  eventDescriptionClassName,
  eventDescriptionStyle,
  eventInfoClassName,
  eventInfoStyle,
  eventTitleClassName,
  eventTitleStyle,
  tooltipClassName,
  className,
  style,
  categoryStyle,
  eventStyle,
  tooltipStyle,
  entry,
  days,
  color,
  hoverContent,
  onEventClick,
}: WeekCalendarRowProps) => {
  const tooltipId = useId();
  const [tooltip, setTooltip] = useState<EventTooltip | null>(null);
  const hideTooltip = () => setTooltip(null);

  const resolvedColor = resolveColor(color);

  return (
    <div
      className={["week-calendar-row", className].filter(Boolean).join(" ")}
      style={{ "--category-color": resolvedColor, ...style } as CSSProperties}
    >
      <div
        className={[
          "week-calendar-row__category-cell week-calendar-row__category-cell--with-point",
          categoryClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={categoryStyle}
      >
        <p
          className={["week-calendar-row__category-name", categoryNameClassName]
            .filter(Boolean)
            .join(" ")}
          style={categoryNameStyle}
        >
          {entry.category.title}
        </p>
        <p
          className={["week-calendar-row__category-info", categoryInfoClassName]
            .filter(Boolean)
            .join(" ")}
          style={categoryInfoStyle}
        >
          {entry.category.label}
        </p>
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
            className={[
              `week-calendar-row__day-cell${hasEvent && onEventClick ? " week-calendar-row__day-cell--clickable" : ""}`,
              dayCellClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={dayCellStyle}
            role={hasEvent && onEventClick ? "button" : undefined}
            tabIndex={
              hasEvent && (onEventClick || hoverContent) ? 0 : undefined
            }
            aria-label={
              hasEvent && event
                ? `${event.title}, ${day.toLocaleDateString()}`
                : undefined
            }
            aria-describedby={tooltip?.event === event ? tooltipId : undefined}
            onMouseMove={
              hasEvent && hoverContent && event
                ? (e) => setTooltip({ x: e.clientX, y: e.clientY, event })
                : undefined
            }
            onMouseLeave={hideTooltip}
            onFocus={
              hasEvent && hoverContent && event
                ? (e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({ x: rect.left, y: rect.bottom, event });
                }
                : undefined
            }
            onBlur={hideTooltip}
            onKeyDown={(e) => {
              if (e.key === "Escape") hideTooltip();
              if (
                hasEvent &&
                event &&
                onEventClick &&
                (e.key === "Enter" || e.key === " ")
              ) {
                e.preventDefault();
                onEventClick(event);
              }
            }}
            onClick={
              hasEvent && onEventClick && event
                ? () => onEventClick(event)
                : undefined
            }
          >
            {hasEvent && (
              <div
                className={[`week-calendar-row__event--${type}`, eventClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={eventStyle}
              />
            )}
            {showContent && (
              <div
                className={["week-calendar-row__event-content", eventClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  {
                    "--event-duration": durationDays,
                    ...eventStyle,
                  } as CSSProperties
                }
              >
                <span
                  className={[
                    "week-calendar-row__event-avatar",
                    eventAvatarClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={eventAvatarStyle}
                >
                  {initial}
                </span>
                {showDetails && event && (
                  <div
                    className={[
                      "week-calendar-row__event-info",
                      eventInfoClassName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={eventInfoStyle}
                  >
                    <span
                      className={[
                        "week-calendar-row__event-title",
                        eventTitleClassName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={eventTitleStyle}
                    >
                      {event.title}
                    </span>
                    {event.description && (
                      <span
                        className={[
                          "week-calendar-row__event-description",
                          eventDescriptionClassName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={eventDescriptionStyle}
                      >
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
      {hoverContent && tooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          className={["week-calendar-row__hover-tooltip", tooltipClassName]
            .filter(Boolean)
            .join(" ")}
          style={
            {
              "--tooltip-x": `${tooltip.x}px`,
              "--tooltip-y": `${tooltip.y}px`,
              ...tooltipStyle,
            } as CSSProperties
          }
        >
          {hoverContent(tooltip.event)}
        </div>
      )}
    </div>
  );
};
