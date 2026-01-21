import "./ClockNumbers.styles.css";
import { ClockNumbersProps } from "./ClockNumbers.types";
import { getDisplayHours } from "./ClockNumbers.utils";

export const ClockNumbers = ({
  mode,
  format,
  currentValue,
}: ClockNumbersProps) => {
  if (mode === "hours") {
    if (format === "24h") {
      const outerHours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      const innerHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      return (
        <>
          {outerHours.map((hour, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            const isSelected = currentValue.hours === hour;
            return (
              <span
                key={`outer-${hour}`}
                className={`time-clock-number${isSelected ? " selected" : ""}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {hour}
              </span>
            );
          })}
          {innerHours.map((hour, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 60;
            const y = Math.sin(angle) * 60;
            const isSelected = currentValue.hours === hour;
            return (
              <span
                key={`inner-${hour}`}
                className={`time-clock-number inner${isSelected ? " selected" : ""}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {hour}
              </span>
            );
          })}
        </>
      );
    } else {
      const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      return (
        <>
          {hours.map((hour, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 100;
            const y = Math.sin(angle) * 100;
            const isSelected =
              getDisplayHours({ format, currentValue }) === hour;
            return (
              <span
                key={hour}
                className={`time-clock-number${isSelected ? " selected" : ""}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {hour}
              </span>
            );
          })}
        </>
      );
    }
  }

  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  return (
    <>
      {minutes.map((minute, index) => {
        const angle = (index * 30 - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        const isSelected = currentValue.minutes === minute;
        return (
          <span
            key={minute}
            className={`time-clock-number${isSelected ? " selected" : ""}`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {minute.toString().padStart(2, "0")}
          </span>
        );
      })}
    </>
  );
};
