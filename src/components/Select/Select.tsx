import "./Select.styles.css";
import { SelectProps } from "./Select.types";

export const Select = ({
  name,
  defaultValue,
  placeholder,
  label,
  error,
  disabled = false,
  options,
  onChange,
}: SelectProps) => {
  const displayLabel = label || placeholder;

  return (
    <div className="select-wrapper">
      {displayLabel && (
        <label
          className={`select-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
        >
          {displayLabel}
        </label>
      )}
      <div className="select-container">
        <select
          className={`select${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(e) => !disabled && onChange?.(e.target.value)}
        >
          {!defaultValue && (
            <option value="" disabled>
              {placeholder || "Selecciona una opción..."}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="select-error">{error}</div>}
    </div>
  );
};
