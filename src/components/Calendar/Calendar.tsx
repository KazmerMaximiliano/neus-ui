import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import {
  CalendarCaptionContext,
  OpenMonthViewContext,
} from "./CalendarContext";
import { CaptionButton } from "./components/CaptionButton";
import "./Calendar.styles.css";
import type {
  CalendarPickerView,
  CalendarProps,
  CalendarSelection,
} from "./Calendar.types";
import {
  YEAR_RANGE_FUTURE_OFFSET,
  YEAR_RANGE_PAST_OFFSET,
} from "./Calendar.consts";
import { getCalendarLocalization, serializeValue } from "./Calendar.utils";

export const Calendar = (props: CalendarProps) => {
  const {
    language,
    value,
    defaultValue,
    name,
    label,
    required = false,
    disabled = false,
    readonly = false,
    numberOfMonths = 1,
    error,
    yearRange,
    calendarStyle,
    labelStyle,
    errorStyle,
  } = props;

  const localization = useMemo(
    () => getCalendarLocalization(language),
    [language],
  );

  const labelId = useId();
  const errorId = useId();
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value");
  const initialValue = isControlled ? value : defaultValue;
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | Date[] | undefined
  >(initialValue);

  const currentYear = new Date().getFullYear();

  const resolvedYearRange = yearRange ?? {
    from: currentYear - YEAR_RANGE_PAST_OFFSET,
    to: currentYear + YEAR_RANGE_FUTURE_OFFSET,
  };

  const getInitialDisplayMonth = (): Date => {
    const v = isControlled ? value : defaultValue;
    if (v instanceof Date) return v;
    if (Array.isArray(v) && v[0] instanceof Date) return v[0];
    if (v && typeof v === "object" && "from" in v && v.from instanceof Date)
      return v.from;
    return new Date();
  };

  const [displayMonth, setDisplayMonth] = useState<Date>(
    getInitialDisplayMonth,
  );

  const [view, setView] = useState<CalendarPickerView>("calendar");

  const yearListRef = useRef<HTMLDivElement>(null);

  const candidate = isControlled ? value : selectedDate;

  const currentValue =
    props.mode === "multiple"
      ? Array.isArray(candidate)
        ? candidate
        : undefined
      : props.mode === "range"
        ? candidate && !Array.isArray(candidate) && !(candidate instanceof Date)
          ? candidate
          : undefined
        : candidate instanceof Date
          ? candidate
          : undefined;

  const dayPickerProps =
    props.mode === "range"
      ? {
        mode: "range" as const,
        selected: currentValue as DateRange | undefined,
        required,
        onSelect: (v: DateRange | undefined) => handleSelect(v),
      }
      : props.mode === "multiple"
        ? {
          mode: "multiple" as const,
          selected: currentValue as Date[] | undefined,
          required,
          onSelect: (v: Date[] | undefined) => handleSelect(v),
        }
        : {
          mode: "single" as const,
          selected: currentValue as Date | undefined,
          required,
          onSelect: (v: Date | undefined) => handleSelect(v),
        };

  const handleSelect = (newValue: CalendarSelection) => {
    if (!disabled && !readonly) {
      if (!isControlled) {
        setSelectedDate(newValue);
      }
      if (props.mode === "range")
        props.onChange?.(newValue as DateRange | undefined);
      else if (props.mode === "multiple")
        props.onChange?.(newValue as Date[] | undefined);
      else props.onChange?.(newValue as Date | undefined);
    }
  };

  useEffect(() => {
    if (view === "year" && yearListRef.current) {
      const selected = yearListRef.current.querySelector<HTMLButtonElement>(
        ".calendar__year-item--selected",
      );
      selected?.scrollIntoView({ block: "center" });
      selected?.focus();
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
      lang={localization.language}
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={error ? errorId : undefined}
      aria-disabled={disabled || undefined}
      className={[
        `calendar${disabled ? " calendar--disabled" : ""}${readonly ? " calendar--readonly" : ""
        }${numberOfMonths > 1 ? " calendar--multiple" : ""}`,
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={calendarStyle}
      onKeyDown={(event) => {
        if (event.key === "Escape" && view !== "calendar") {
          event.stopPropagation();
          setView("calendar");
        }
      }}
    >
      {label && (
        <div
          className={["calendar__label-wrapper", props.labelWrapperClassName]
            .filter(Boolean)
            .join(" ")}
          style={props.labelWrapperStyle}
        >
          <span
            id={labelId}
            className={[
              `calendar__label${error ? " calendar__label--error" : ""}`,
              props.labelClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={labelStyle}
          >
            {label}
            {required && (
              <span
                className={["calendar__required", props.requiredClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={props.requiredStyle}
                aria-hidden
              >
                *
              </span>
            )}
          </span>
        </div>
      )}

      <div
        className={[
          `calendar__day-picker${view === "calendar" ? " calendar__day-picker--calendar" : ""}`,
          props.dayPickerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={props.dayPickerStyle}
      >
        <CalendarCaptionContext.Provider
          value={{
            captionClassName: props.captionClassName,
            captionStyle: props.captionStyle,
          }}
        >
          <OpenMonthViewContext.Provider value={() => setView("month")}>
            <DayPicker
              components={{ CaptionLabel: CaptionButton }}
              formatters={localization.formatters}
              labels={localization.labels}
              showOutsideDays={false}
              fixedWeeks={true}
              disabled={disabled}
              numberOfMonths={Math.max(1, Math.floor(numberOfMonths) || 1)}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              {...dayPickerProps}
            />
          </OpenMonthViewContext.Provider>
        </CalendarCaptionContext.Provider>

        {view === "month" && (
          <div
            className={["calendar__overlay", props.overlayClassName]
              .filter(Boolean)
              .join(" ")}
            style={props.overlayStyle}
          >
            <div
              className={[
                "calendar__overlay-header",
                props.overlayHeaderClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={props.overlayHeaderStyle}
            >
              <button
                type="button"
                className={[
                  "calendar__overlay-year-btn",
                  props.overlayYearBtnClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={props.overlayYearBtnStyle}
                aria-expanded={false}
                onClick={() => setView("year")}
              >
                {localization.formatYear(displayMonth)}
                <ChevronDown
                  size={14}
                  className={[
                    "calendar__overlay-year-icon",
                    props.overlayYearIconClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={props.overlayYearIconStyle}
                />
              </button>
            </div>
            <div
              className={["calendar__month-grid", props.monthGridClassName]
                .filter(Boolean)
                .join(" ")}
              style={props.monthGridStyle}
            >
              {localization.monthNames.map((name, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-pressed={idx === displayMonth.getMonth()}
                  className={[
                    `calendar__month-item${idx === displayMonth.getMonth()
                      ? " calendar__month-item--selected"
                      : ""
                    }`,
                    props.monthItemClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={props.monthItemStyle}
                  onClick={() => selectMonth(idx)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "year" && (
          <div
            className={["calendar__overlay", props.overlayClassName]
              .filter(Boolean)
              .join(" ")}
            style={props.overlayStyle}
          >
            <div
              className={[
                "calendar__overlay-header",
                props.overlayHeaderClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={props.overlayHeaderStyle}
            >
              <button
                type="button"
                className={[
                  "calendar__overlay-year-btn",
                  props.overlayYearBtnClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={props.overlayYearBtnStyle}
                aria-expanded={true}
                onClick={() => setView("month")}
              >
                {localization.formatYear(displayMonth)}
                <ChevronUp
                  size={14}
                  className={[
                    "calendar__overlay-year-icon",
                    props.overlayYearIconClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={props.overlayYearIconStyle}
                />
              </button>
            </div>
            <div
              className={["calendar__year-list", props.yearListClassName]
                .filter(Boolean)
                .join(" ")}
              style={props.yearListStyle}
              ref={yearListRef}
            >
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={y === displayMonth.getFullYear()}
                  className={[
                    `calendar__year-item${y === displayMonth.getFullYear()
                      ? " calendar__year-item--selected"
                      : ""
                    }`,
                    props.yearItemClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={props.yearItemStyle}
                  onClick={() => selectYear(y)}
                >
                  {localization.formatYear(new Date(y, 0, 1))}
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
        <div
          className={["calendar__info", props.infoClassName]
            .filter(Boolean)
            .join(" ")}
          style={props.infoStyle}
        >
          <div
            id={errorId}
            className={["calendar__error-message", props.errorClassName]
              .filter(Boolean)
              .join(" ")}
            style={errorStyle}
          >
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
