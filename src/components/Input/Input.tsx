import { CircleAlert } from "lucide-react";
import { useId } from "react";
import "../../css/field.css";
import "./Input.styles.css";
import type { InputProps } from "./Input.types";

export const Input = ({
  className,
  controlClassName,
  controlStyle,
  descriptionClassName,
  descriptionStyle,
  errorClassName,
  errorIconClassName,
  inputClassName,
  labelClassName,
  prefixClassName,
  requiredClassName,
  suffixClassName,
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
  description,
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
  "aria-describedby": describedBy,
  ...native
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div
      className={["input__wrapper field-presentation", className]
        .filter(Boolean)
        .join(" ")}
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
          className={[
            `input__label${error ? " input__label--error" : ""}${
              disabled ? " input__label--disabled" : ""
            }`,
            labelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
          {required && (
            <span
              className={["input__required", requiredClassName]
                .filter(Boolean)
                .join(" ")}
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      <div
        className={["input__control", controlClassName]
          .filter(Boolean)
          .join(" ")}
        style={controlStyle}
      >
        {prefix != null && (
          <span
            className={["input__prefix", prefixClassName]
              .filter(Boolean)
              .join(" ")}
            style={prefixStyle}
          >
            {prefix}
          </span>
        )}
        <input
          {...native}
          id={inputId}
          aria-label={ariaLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [
              describedBy,
              description != null && descriptionId,
              error && errorId,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          style={inputStyle}
          className={[
            `input input--${type}${error ? " input--error" : ""}${
              disabled ? " input--disabled" : ""
            }`,
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
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
          <span
            className={["input__suffix", suffixClassName]
              .filter(Boolean)
              .join(" ")}
            style={suffixStyle}
          >
            {suffix}
          </span>
        )}
        {error && errorIcon !== null && (
          <span
            className={["input__error-icon", errorIconClassName]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
            style={errorIconStyle}
          >
            {errorIcon ?? <CircleAlert />}
          </span>
        )}
      </div>
      {description != null && (
        <div
          id={descriptionId}
          className={["field__description", descriptionClassName]
            .filter(Boolean)
            .join(" ")}
          style={descriptionStyle}
        >
          {description}
        </div>
      )}
      {error && (
        <div
          id={errorId}
          className={["input__error-message", errorClassName]
            .filter(Boolean)
            .join(" ")}
          style={errorStyle}
        >
          {error}
        </div>
      )}
    </div>
  );
};
