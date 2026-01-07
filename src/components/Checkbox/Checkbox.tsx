import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({ name, checked, disabled = false, onChange }: CheckboxProps) => {
  return (
    <input
      className="checkbox"
      type="checkbox"
      name={name}
      onChange={(e) => !disabled && onChange?.(e.target.checked)}
      checked={checked}
      disabled={disabled}
      readOnly
    />
  );
};
