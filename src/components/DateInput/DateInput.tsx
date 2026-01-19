import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../Calendar/Calendar";
import "./DateInput.styles.css";
import { DateInputProps } from "./DateInput.types";
import { formatDateForDisplay, serializeDateValue } from "./DateInput.utils";

export const DateInput = ({
  label,
  name,
  error,
  disabled,
  mode,
  placeholder,
  readonly,
  value,
  defaultValue,
  required,
  onChange,
}: DateInputProps) => {
  const isControlled = value !== undefined;
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | undefined
  >(isControlled ? value : defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentValue = isControlled ? value : selectedDate;
  const displayValue = formatDateForDisplay(currentValue, mode);

  const getSingleDate = (): Date => {
    if (currentValue instanceof Date) {
      return currentValue;
    }
    return new Date();
  };

  const getRangeDate = (): DateRange => {
    if (currentValue instanceof Date) {
      return { from: currentValue, to: undefined };
    }
    if (currentValue && "from" in currentValue) {
      return currentValue;
    }
    return { from: new Date(), to: undefined };
  };

  const handleSelect = (newValue: Date | DateRange | undefined) => {
    if (!disabled && !readonly) {
      if (!isControlled) {
        setSelectedDate(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
      if (mode === "single") {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isControlled) {
      setSelectedDate(value);
    }
  }, [value, isControlled]);

  return (
    <div className="date-input-wrapper" ref={containerRef}>
      {label && (
        <label
          className={`date-input-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
        >
          {label}
          {required && <span className="date-input-required">*</span>}
        </label>
      )}

      <div className="date-input-container">
        <button
          ref={buttonRef}
          className={`date-input-field${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
          onClick={() => !disabled && !readonly && setIsOpen(!isOpen)}
          disabled={disabled}
          type="button"
        >
          {displayValue || placeholder}
        </button>

        {isOpen && (
          <div
            className="date-input-dropdown"
            style={{
              left: mode == "single" ? "-75px" : "-250px",
              minWidth: mode == "single" ? "350px" : "700px",
            }}
          >
            {mode === "single" ? (
              <Calendar
                mode="single"
                selected={getSingleDate()}
                value={currentValue}
                onChange={(newValue) =>
                  handleSelect(newValue as Date | DateRange | undefined)
                }
                disabled={disabled}
                readonly={readonly}
                required={!required}
              />
            ) : (
              <Calendar
                mode="range"
                selected={getRangeDate()}
                value={currentValue}
                onChange={(newValue) =>
                  handleSelect(newValue as Date | DateRange | undefined)
                }
                disabled={disabled}
                readonly={readonly}
                required={true}
                multiple={true}
              />
            )}
          </div>
        )}
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={serializeDateValue(currentValue)}
          required={required}
        />
      )}

      {error && <div className="date-input-error">{error}</div>}
    </div>
  );
};
