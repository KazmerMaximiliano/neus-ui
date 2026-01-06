import "./Input.styles.css";
import { InputProps } from "./Input.types";

export const Input = ({
  name,
  defaultValue,
  placeholder,
  error,
  type = "text",
  min,
  max,
  step,
  onChange,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        className={`input input-${type}${error ? " error" : ""}`}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="input-error">{error}</div>
    </div>
  );
};
