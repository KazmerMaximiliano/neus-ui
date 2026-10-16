import { Check, Minus } from "lucide-react";
import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  checkboxClassName,
  className,
  iconClassName,
  iconStyle,
  inputClassName,
  inputStyle,
  labelClassName,
  style,
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
    <label
      className={[classes.filter(Boolean).join(" "), className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <input
        className={["checkbox__input", inputClassName]
          .filter(Boolean)
          .join(" ")}
        style={inputStyle}
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
      <span
        className={["checkbox__box", checkboxClassName]
          .filter(Boolean)
          .join(" ")}
        style={checkboxStyle}
        aria-hidden
      >
        <Icon
          className={["checkbox__icon", iconClassName]
            .filter(Boolean)
            .join(" ")}
          style={iconStyle}
        />
      </span>
      {label && (
        <span
          className={["checkbox__label", labelClassName]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
        >
          {label}
        </span>
      )}
    </label>
  );
};
