import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { ClockNumbers } from "./components/ClockNumbers/ClockNumbers";
import "./Clock.styles.css";
import { ClockProps, TimeValue } from "./Clock.types";
import { INNER_RING_THRESHOLD, KEY_STEPS } from "./Clock.consts";
import {
  getDisplayHours,
  getHandAngle,
  getHandLength,
  serializeTimeValue,
  stepTime,
} from "./Clock.utils";

export const Clock = ({
  numberClassName,
  centerClassName,
  centerStyle,
  className,
  clockClassName,
  displayClassName,
  displayStyle,
  faceClassName,
  handTipClassName,
  handTipStyle,
  headerClassName,
  indicatorClassName,
  numbersClassName,
  numbersStyle,
  periodClassName,
  periodContentClassName,
  periodContentStyle,
  segmentClassName,
  separatorClassName,
  separatorStyle,
  style,
  value,
  disabled,
  readonly,
  format = "12h",
  clockStyle,
  headerStyle,
  faceStyle,
  segmentStyle,
  periodStyle,
  numberStyle,
  indicatorStyle,
  onChange,
}: ClockProps) => {
  const initialValue = value || { hours: 12, minutes: 0 };
  const isControlled = value !== undefined;

  const [selectedTime, setSelectedTime] = useState<TimeValue>(initialValue);
  const [mode, setMode] = useState<"hours" | "minutes">("hours");

  const currentValue = isControlled ? value : selectedTime;
  const period = currentValue.hours >= 12 ? "PM" : "AM";

  const handleTimeChange = (newValue: TimeValue) => {
    if (!disabled && !readonly) {
      if (!isControlled) {
        setSelectedTime(newValue);
      }
      onChange?.(newValue);
    }
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    if (disabled || readonly || format === "24h") return;

    let newHours = currentValue.hours;

    if (newPeriod === "AM" && currentValue.hours >= 12) {
      newHours = currentValue.hours - 12;
    } else if (newPeriod === "PM" && currentValue.hours < 12) {
      newHours = currentValue.hours + 12;
    }

    handleTimeChange({ ...currentValue, hours: newHours });
  };

  const handleClockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || readonly) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    if (mode === "hours") {
      let hours: number;

      if (format === "24h") {
        const distance = Math.sqrt(x * x + y * y);
        const isInner = distance < rect.width * INNER_RING_THRESHOLD;
        const hourValue = Math.round(angle / 30) % 12;

        if (isInner) {
          hours = hourValue === 0 ? 0 : hourValue;
        } else {
          hours = hourValue === 0 ? 12 : hourValue + 12;
          if (hours === 24) hours = 12;
        }
      } else {
        hours = Math.round(angle / 30) % 12;

        if (hours === 0) hours = 12;
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
      }

      handleTimeChange({ ...currentValue, hours });
      setMode("minutes");
    } else {
      const minutes = Math.round(angle / 6) % 60;
      handleTimeChange({ ...currentValue, minutes });
    }
  };

  const handleFaceKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readonly) return;
    if (event.key === "Enter" && mode === "hours") {
      event.preventDefault();
      setMode("minutes");
      return;
    }
    const delta = KEY_STEPS[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    handleTimeChange(stepTime(currentValue, mode, format, delta));
  };

  const isHours = mode === "hours";
  const sliderValue = isHours
    ? getDisplayHours({ format, currentValue })
    : currentValue.minutes;

  const handStyle = {
    "--clock-hand-angle": `${getHandAngle({ mode, format, currentValue })}deg`,
    "--clock-hand-scale": getHandLength({ mode, format, currentValue }) / 100,
  } as CSSProperties;

  return (
    <div
      className={[
        `clock__wrapper${disabled ? " clock__wrapper--disabled" : ""}${readonly ? " clock__wrapper--readonly" : ""}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <div
        className={["clock__container", clockClassName]
          .filter(Boolean)
          .join(" ")}
        style={clockStyle}
      >
        <div
          className={["clock__header", headerClassName]
            .filter(Boolean)
            .join(" ")}
          style={headerStyle}
        >
          <div
            className={["clock__display", displayClassName]
              .filter(Boolean)
              .join(" ")}
            style={displayStyle}
          >
            <button
              type="button"
              className={[
                `clock__time-button${mode === "hours" ? " clock__time-button--active" : ""}`,
                segmentClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={segmentStyle}
              aria-label="Horas"
              aria-pressed={mode === "hours"}
              onClick={() => !disabled && !readonly && setMode("hours")}
              disabled={disabled}
            >
              {getDisplayHours({ format, currentValue })
                .toString()
                .padStart(2, "0")}
            </button>
            <span
              className={["clock__separator", separatorClassName]
                .filter(Boolean)
                .join(" ")}
              style={separatorStyle}
            >
              :
            </span>
            <button
              type="button"
              className={[
                `clock__time-button${mode === "minutes" ? " clock__time-button--active" : ""}`,
                segmentClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={segmentStyle}
              aria-label="Minutos"
              aria-pressed={mode === "minutes"}
              onClick={() => !disabled && !readonly && setMode("minutes")}
              disabled={disabled}
            >
              {currentValue.minutes.toString().padStart(2, "0")}
            </button>
          </div>
          {format === "12h" && (
            <div
              className={["clock__period", periodContentClassName]
                .filter(Boolean)
                .join(" ")}
              style={periodContentStyle}
            >
              <button
                type="button"
                className={[
                  `clock__period-button${period === "AM" ? " clock__period-button--active" : ""}`,
                  periodClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={periodStyle}
                aria-pressed={period === "AM"}
                onClick={() => handlePeriodChange("AM")}
                disabled={disabled}
              >
                AM
              </button>
              <button
                type="button"
                className={[
                  `clock__period-button${period === "PM" ? " clock__period-button--active" : ""}`,
                  periodClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={periodStyle}
                aria-pressed={period === "PM"}
                onClick={() => handlePeriodChange("PM")}
                disabled={disabled}
              >
                PM
              </button>
            </div>
          )}
        </div>
        <div
          className={["clock__face", faceClassName].filter(Boolean).join(" ")}
          style={{ ...handStyle, ...faceStyle }}
          onClick={handleClockClick}
          onKeyDown={handleFaceKeyDown}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={isHours ? "Horas" : "Minutos"}
          aria-valuemin={isHours ? (format === "24h" ? 0 : 1) : 0}
          aria-valuemax={isHours ? (format === "24h" ? 23 : 12) : 59}
          aria-valuenow={sliderValue}
          aria-valuetext={serializeTimeValue(currentValue)}
          aria-disabled={disabled || undefined}
          aria-readonly={readonly || undefined}
        >
          <div
            className={["clock__center", centerClassName]
              .filter(Boolean)
              .join(" ")}
            style={centerStyle}
          />
          <div
            className={["clock__hand", indicatorClassName]
              .filter(Boolean)
              .join(" ")}
            style={indicatorStyle}
          >
            <div
              className={["clock__hand-tip", handTipClassName]
                .filter(Boolean)
                .join(" ")}
              style={handTipStyle}
            />
          </div>
          <div
            className={["clock__numbers", numbersClassName]
              .filter(Boolean)
              .join(" ")}
            style={numbersStyle}
          >
            <ClockNumbers
              numberClassName={numberClassName}
              numberStyle={numberStyle}
              mode={mode}
              format={format}
              currentValue={currentValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
