import "./Input.styles.css";
import { InputProps } from "./Input.types";

export const Input = ({
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
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label
          className={`input-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
        >
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        className={`input input-${type}${error ? " error" : ""}${
          disabled ? " disabled" : ""
        }`}
        required={required}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readonly}
        onChange={(e) => !disabled && onChange?.(e.target.value)}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};
