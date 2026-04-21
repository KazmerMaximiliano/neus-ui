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
        onChange(newValue);
      }
    }
  };

  // Sync internal state when controlled prop changes
  useEffect(() => {
    if (isControlled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedDate(value);
    }
  }, [value, isControlled]);

  return (
    <div
      className={`calendar${disabled ? " calendar--disabled" : ""}${
        readonly ? " calendar--readonly" : ""
      }`}
    >
      {label && (
        <div className="calendar__label-wrapper">
          <label className={`calendar__label${error ? " calendar__label--error" : ""}`}>
            {label}
            {required && <span className="calendar__required">*</span>}
          </label>
        </div>
      )}

      <div className="calendar__day-picker">
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
        <div className="calendar__info">
          <div className="calendar__error-message">{error}</div>
        </div>
      )}
    </div>
  );
};
