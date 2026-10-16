import { CircleAlert } from "lucide-react";
import { useId } from "react";
import "../../css/field.css";
import "./Input.styles.css";
import type { InputProps } from "./Input.types";

export const Input = ({
  variant = "auto",
  labelPlacement = "auto",
  size = "medium",
  prefix,
  suffix,
  errorIcon,
  prefixStyle,
  suffixStyle,
  errorIconStyle,
  id,
  "aria-label": ariaLabel,
  name,
  value,
  defaultValue,
  placeholder,
  label,
  error,
  disabled = false,
  readonly = false,
  required = false,
  type = "text",
  min,
  max,
  step,
  wrapperStyle,
  inputStyle,
  labelStyle,
  requiredStyle,
  errorStyle,
  onChange,
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div
      className="input__wrapper field-presentation"
      data-variant={variant}
      data-label-placement={labelPlacement}
      data-size={size}
      data-native-color={type === "color" || undefined}
      style={wrapperStyle}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={labelStyle}
          className={`input__label${error ? " input__label--error" : ""}${
            disabled ? " input__label--disabled" : ""
          }`}
        >
          {label}
          {required && (
            <span
              className="input__required"
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      <div className="input__control">
        {prefix != null && (
          <span className="input__prefix" style={prefixStyle}>
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          style={inputStyle}
          className={`input input--${type}${error ? " input--error" : ""}${
            disabled ? " input--disabled" : ""
          }`}
          required={required}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder || " "}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readonly}
          onChange={(e) => !disabled && onChange?.(e.target.value)}
        />
        {suffix != null && (
          <span className="input__suffix" style={suffixStyle}>
            {suffix}
          </span>
        )}
        {error && errorIcon !== null && (
          <span
            className="input__error-icon"
            aria-hidden="true"
            style={errorIconStyle}
          >
            {errorIcon ?? <CircleAlert />}
          </span>
        )}
      </div>
      {error && (
        <div id={errorId} className="input__error-message" style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
};
