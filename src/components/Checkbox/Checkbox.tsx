import { Check, Minus } from "lucide-react";
import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  name,
  value,
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  checkboxStyle,
  labelStyle,
  onChange,
}: CheckboxProps) => {
  const Icon = indeterminate ? Minus : Check;
  const classes = [
    "checkbox",
    checked && "checkbox--checked",
    indeterminate && "checkbox--indeterminate",
    disabled && "checkbox--disabled",
  ];

  return (
    <label className={classes.filter(Boolean).join(" ")}>
      <input
        className="checkbox__input"
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        ref={(input) => {
          if (input) input.indeterminate = indeterminate;
        }}
        onChange={(e) => !disabled && onChange?.(e.target.checked)}
      />
      <span className="checkbox__box" style={checkboxStyle} aria-hidden>
        <Icon className="checkbox__icon" />
      </span>
      {label && (
        <span className="checkbox__label" style={labelStyle}>
          {label}
        </span>
      )}
    </label>
  );
};
