import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.styles.css";
import type { CalendarProps } from "./Calendar.types";
import { getDayPickerProps, serializeValue } from "./Calendar.utils";

export const Calendar = ({
  mode = "single",
  value,
  defaultValue,
  name,
  label,
  required = false,
  disabled = false,
  readonly = false,
  multiple = false,
  error,
  onChange,
}: CalendarProps) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | Date[] | undefined
  >(initialValue);

  const currentValue = isControlled ? value : selectedDate;

  const dayPickerProps = getDayPickerProps(mode, currentValue, required);

  const handleSelect = (newValue: Date | DateRange | Date[] | undefined) => {
    if (!disabled && !readonly) {
      if (!isControlled) {
        setSelectedDate(newValue);
      }
      if (onChange) {
        (onChange as (value: any) => void)(newValue);
      }
    }
  };

  useEffect(() => {
    if (isControlled) {
      setSelectedDate(value);
    }
  }, [value, isControlled]);

  return (
    <div
      className={`calendar-container${disabled ? " disabled" : ""}${
        readonly ? " readonly" : ""
      }`}
    >
      {label && (
        <div className="label-wrapper">
          <label className={`calendar-label${error ? " error" : ""}`}>
            {label}
            {required && <span className="calendar-required">*</span>}
          </label>
        </div>
      )}

      <div className="day-picker-container">
        <DayPicker
          showOutsideDays={false}
          fixedWeeks={true}
          disabled={disabled}
          onSelect={handleSelect}
          numberOfMonths={multiple ? 2 : 1}
          {...dayPickerProps}
        />
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={serializeValue(currentValue)}
          required={required}
        />
      )}

      {error && (
        <div className="info-container">
          <div className="calendar-error">{error}</div>
        </div>
      )}
    </div>
  );
};
