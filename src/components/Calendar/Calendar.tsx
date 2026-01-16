import { useEffect, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.styles.css";
import { CalendarProps } from "./Calendar.types";
import { formatDate, formatDateRange } from "./Calendar.utils";

export const Calendar = ({
  mode = "single",
  selected,
  locale = "en-US",
  label,
  required = false,
  disabled = false,
  readonly = false,
  multiple = false,
  error,
  onSelect,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<
    Date | Date[] | DateRange | undefined
  >(selected);

  const displayValue =
    mode === "single"
      ? formatDate(selected as Date | undefined, locale)
      : mode === "range"
      ? formatDateRange(selected as DateRange | undefined, locale)
      : "";

  const handleSelect = (value: Date | Date[] | DateRange | undefined) => {
    if (!disabled && !readonly) {
      setSelectedDate(value);
      onSelect?.(value);
    }
  };

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

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
          mode={mode || "single"}
          required={required}
          selected={selectedDate}
          onSelect={handleSelect}
          numberOfMonths={multiple ? 2 : 1}
          disabled={disabled}
        />
      </div>

      {error && (
        <div className="info-container">
          <div className="calendar-error">{error}</div>
        </div>
      )}
    </div>
  );
};
