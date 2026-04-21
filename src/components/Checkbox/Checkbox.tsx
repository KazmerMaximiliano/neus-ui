import { Check } from "lucide-react";
import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  name,
  checked,
  disabled = false,
  onChange,
}: CheckboxProps) => {
  return (
    <label
      className={`checkbox${checked ? " checkbox--checked" : ""}${disabled ? " checkbox--disabled" : ""}`}
    >
      <input
        type="checkbox"
        name={name}
        onChange={(e) => !disabled && onChange?.(e.target.checked)}
        checked={checked}
        disabled={disabled}
        readOnly
      />
      <Check className="checkbox__icon" />
    </label>
  );
};
