import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.styles.css";
import type { CalendarProps } from "./Calendar.types";
import { getDayPickerProps, serializeValue } from "./Calendar.utils";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type PickerView = "calendar" | "month" | "year";

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
  yearRange,
  onChange,
}: CalendarProps) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | Date[] | undefined
  >(initialValue);

  const currentYear = new Date().getFullYear();
  const resolvedYearRange = yearRange ?? { from: currentYear - 50, to: currentYear + 10 };

  const getInitialDisplayMonth = (): Date => {
    const v = isControlled ? value : defaultValue;
    if (v instanceof Date) return v;
    if (Array.isArray(v) && v[0] instanceof Date) return v[0];
    if (v && typeof v === "object" && "from" in v && v.from instanceof Date) return v.from;
    return new Date();
  };

  const [displayMonth, setDisplayMonth] = useState<Date>(getInitialDisplayMonth);
  const [view, setView] = useState<PickerView>("calendar");
  const yearListRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isControlled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedDate(value);
    }
  }, [value, isControlled]);

  // Intercept click on DayPicker's native caption label to open month picker
  useEffect(() => {
    const container = pickerRef.current;
    if (!container) return;

    const handleCaptionClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".rdp-caption_label")) {
        e.stopPropagation();
        setView("month");
      }
    };

    container.addEventListener("click", handleCaptionClick);
    return () => container.removeEventListener("click", handleCaptionClick);
  }, []);

  // Scroll selected year into view when year picker opens
  useEffect(() => {
    if (view === "year" && yearListRef.current) {
      const selected = yearListRef.current.querySelector<HTMLButtonElement>(
        ".calendar__year-item--selected",
      );
      selected?.scrollIntoView({ block: "center" });
    }
  }, [view]);

  const selectMonth = (monthIndex: number) => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), monthIndex));
    setView("calendar");
  };

  const selectYear = (year: number) => {
    setDisplayMonth(new Date(year, displayMonth.getMonth()));
    setView("calendar");
  };

  const years: number[] = [];
  for (let y = resolvedYearRange.from; y <= resolvedYearRange.to; y++) {
    years.push(y);
  }

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

      <div className={`calendar__day-picker${view === "calendar" ? " calendar__day-picker--calendar" : ""}`} ref={pickerRef}>
        <DayPicker
          showOutsideDays={false}
          fixedWeeks={true}
          disabled={disabled}
          onSelect={handleSelect}
          numberOfMonths={multiple ? 2 : 1}
          month={displayMonth}
          onMonthChange={setDisplayMonth}
          {...dayPickerProps}
        />

        {view === "month" && (
          <div className="calendar__overlay">
            <div className="calendar__overlay-header">
              <button
                className="calendar__overlay-year-btn"
                onClick={() => setView("year")}
              >
                {displayMonth.getFullYear()}
                <ChevronDown size={14} />
              </button>
            </div>
            <div className="calendar__month-grid">
              {MONTH_NAMES.map((name, idx) => (
                <button
                  key={name}
                  className={`calendar__month-item${
                    idx === displayMonth.getMonth()
                      ? " calendar__month-item--selected"
                      : ""
                  }`}
                  onClick={() => selectMonth(idx)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "year" && (
          <div className="calendar__overlay">
            <div className="calendar__overlay-header">
              <button
                className="calendar__overlay-year-btn"
                onClick={() => setView("month")}
              >
                {displayMonth.getFullYear()}
                <ChevronUp size={14} />
              </button>
            </div>
            <div className="calendar__year-list" ref={yearListRef}>
              {years.map((y) => (
                <button
                  key={y}
                  className={`calendar__year-item${
                    y === displayMonth.getFullYear()
                      ? " calendar__year-item--selected"
                      : ""
                  }`}
                  onClick={() => selectYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}
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
