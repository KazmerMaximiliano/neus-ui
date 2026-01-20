import { useEffect, useRef, useState } from "react";

import { Clock } from "../Clock/Clock";
import { TimeValue } from "../Clock/Clock.types";
import "./TimeInput.styles.css";
import { TimeInputProps } from "./TimeInput.types";
import { serializeTimeValue } from "./TimeInput.utils";

export const TimeInput = ({
  label,
  name,
  error,
  disabled,
  placeholder,
  readonly,
  value,
  defaultValue,
  required,
  onChange,
}: TimeInputProps) => {
  const isControlled = value !== undefined;

  const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>(
    isControlled ? value : defaultValue,
  );

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentValue = isControlled ? value : selectedTime;
  const displayValue = serializeTimeValue(currentValue);

  const handleSelect = (newValue: TimeValue | undefined) => {
    if (!disabled && !readonly) {
      if (!isControlled) {
        setSelectedTime(newValue);
      }
      if (onChange) {
        onChange(newValue);
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
      setSelectedTime(value);
    }
  }, [value, isControlled]);

  return (
    <div className="time-input-wrapper" ref={containerRef}>
      {label && (
        <label
          className={`time-input-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
        >
          {label}
          {required && <span className="time-input-required">*</span>}
        </label>
      )}

      <div className="time-input-container">
        <button
          ref={buttonRef}
          className={`time-input-field${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
          onClick={() => !disabled && !readonly && setIsOpen(!isOpen)}
          disabled={disabled}
          type="button"
        >
          {displayValue || placeholder}
        </button>

        {isOpen && (
          <div className="time-input-dropdown">
            <Clock
              value={currentValue}
              onChange={(newValue) =>
                handleSelect(newValue as TimeValue | undefined)
              }
              disabled={disabled}
              readonly={readonly}
            />
          </div>
        )}
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={serializeTimeValue(currentValue)}
          required={required}
        />
      )}

      {error && <div className="time-input-error">{error}</div>}
    </div>
  );
};
