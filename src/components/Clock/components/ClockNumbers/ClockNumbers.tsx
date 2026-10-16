import type { CSSProperties } from "react";
import {
  HOURS_12,
  INNER_HOURS,
  MINUTES,
  OUTER_HOURS,
} from "./ClockNumbers.consts";
import "./ClockNumbers.styles.css";
import { ClockNumbersProps, DialNumber } from "./ClockNumbers.types";
import { getDisplayHours } from "./ClockNumbers.utils";

export const ClockNumbers = ({
  numberStyle,
  mode,
  format,
  currentValue,
}: ClockNumbersProps) => {
  let numbers: DialNumber[];
  if (mode === "minutes") {
    numbers = MINUTES.map((minute) => ({
      key: `${minute}`,
      label: minute.toString().padStart(2, "0"),
      selected: currentValue.minutes === minute,
    }));
  } else if (format === "24h") {
    numbers = [
      ...OUTER_HOURS.map((hour) => ({
        key: `outer-${hour}`,
        label: `${hour}`,
        selected: currentValue.hours === hour,
      })),
      ...INNER_HOURS.map((hour) => ({
        key: `inner-${hour}`,
        label: `${hour}`,
        selected: currentValue.hours === hour,
        inner: true,
      })),
    ];
  } else {
    const displayHours = getDisplayHours({ format, currentValue });
    numbers = HOURS_12.map((hour) => ({
      key: `${hour}`,
      label: `${hour}`,
      selected: displayHours === hour,
    }));
  }

  return (
    <>
      {numbers.map(({ key, label, selected, inner }, index) => (
        <span
          key={key}
          aria-hidden
          data-label={label}
          className={`clock__number${inner ? " clock__number--inner" : ""}${
            selected ? " clock__number--selected" : ""
          }`}
          style={
            {
              "--clock-number-angle": `${(index % 12) * 30}deg`,
              ...numberStyle,
            } as CSSProperties
          }
        >
          {label}
        </span>
      ))}
    </>
  );
};
