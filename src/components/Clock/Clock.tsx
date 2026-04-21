import { useState } from "react";
import { ClockNumbers } from "../ClockNumbers/ClockNumbers";
import "./Clock.styles.css";
import { ClockProps, TimeValue } from "./Clock.types";
import {
  getDisplayHours,
  getHandAngle,
  getHandLength,
} from "./Clock.utils";

export const Clock = ({
  value,
  disabled,
  readonly,
  format = "12h",
  onChange,
}: ClockProps) => {
  const initialValue = value || { hours: 12, minutes: 0 };
  const isControlled = value !== undefined;

  const [selectedTime, setSelectedTime] = useState<TimeValue>(initialValue);
  const [period, setPeriod] = useState<"AM" | "PM">(
    initialValue.hours >= 12 ? "PM" : "AM",
  );
  const [mode, setMode] = useState<"hours" | "minutes">("hours");

  const currentValue = isControlled ? value : selectedTime;

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

    setPeriod(newPeriod);

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
        const isInner = distance < 70;
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

  return (
    <div
      className={`clock__wrapper${disabled ? " clock__wrapper--disabled" : ""}${readonly ? " clock__wrapper--readonly" : ""}`}
    >
      <div className="clock__container">
        <div className="clock__header">
          <div className="clock__display">
            <button
              type="button"
              className={`clock__time-button${mode === "hours" ? " clock__time-button--active" : ""}`}
              onClick={() => !disabled && !readonly && setMode("hours")}
              disabled={disabled}
            >
              {getDisplayHours({ format, currentValue })
                .toString()
                .padStart(2, "0")}
            </button>
            <span className="clock__separator">:</span>
            <button
              type="button"
              className={`clock__time-button${mode === "minutes" ? " clock__time-button--active" : ""}`}
              onClick={() => !disabled && !readonly && setMode("minutes")}
              disabled={disabled}
            >
              {currentValue.minutes.toString().padStart(2, "0")}
            </button>
          </div>
          {format === "12h" && (
            <div className="clock__period">
              <button
                type="button"
                className={`clock__period-button${period === "AM" ? " clock__period-button--active" : ""}`}
                onClick={() => handlePeriodChange("AM")}
                disabled={disabled}
              >
                AM
              </button>
              <button
                type="button"
                className={`clock__period-button${period === "PM" ? " clock__period-button--active" : ""}`}
                onClick={() => handlePeriodChange("PM")}
                disabled={disabled}
              >
                PM
              </button>
            </div>
          )}
        </div>
        <div
          className="clock__face"
          onClick={handleClockClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          <div className="clock__center" />
          <div
            className="clock__hand"
            style={{
              transform: `rotate(${getHandAngle({ mode, format, currentValue })}deg)`,
              width: `${getHandLength({ mode, format, currentValue })}px`,
            }}
          >
            <div className="clock__hand-tip" />
          </div>
          <div className="clock__numbers">
            <ClockNumbers
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
