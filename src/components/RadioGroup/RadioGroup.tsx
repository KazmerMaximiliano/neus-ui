import { useId } from "react";
import { RadioContext } from "../Radio";
import type { RadioGroupProps } from "./RadioGroup.types";
import "../../css/field.css";
import "./RadioGroup.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export const RadioGroup = ({
  className,
  style,
  labelClassName,
  labelStyle,
  requiredClassName,
  requiredStyle,
  optionsClassName,
  optionsStyle,
  descriptionClassName,
  descriptionStyle,
  errorClassName,
  errorStyle,
  label,
  description,
  error,
  name,
  value,
  defaultValue,
  orientation = "vertical",
  required = false,
  disabled = false,
  children,
  onChange,
  "aria-describedby": describedBy,
  ...native
}: RadioGroupProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <fieldset
      {...native}
      className={join("radio-group", className)}
      style={style}
      // The legend still names the fieldset; the role adds the required and invalid states.
      role="radiogroup"
      disabled={disabled}
      data-orientation={orientation}
      aria-required={required || undefined}
      aria-invalid={error ? true : undefined}
      aria-describedby={
        join(describedBy, description != null && descriptionId, error && errorId) || undefined
      }
    >
      {label && (
        <legend className={join("radio-group__label", labelClassName)} style={labelStyle}>
          {label}
          {required && (
            <span
              className={join("radio-group__required", requiredClassName)}
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </legend>
      )}
      {description != null && (
        <div
          id={descriptionId}
          className={join("field__description", descriptionClassName)}
          style={descriptionStyle}
        >
          {description}
        </div>
      )}
      <div className={join("radio-group__options", optionsClassName)} style={optionsStyle}>
        <RadioContext.Provider
          value={{ name: name ?? id, value, defaultValue, required, invalid: Boolean(error), onChange }}
        >
          {children}
        </RadioContext.Provider>
      </div>
      {error && (
        <div id={errorId} className={join("radio-group__error", errorClassName)} style={errorStyle}>
          {error}
        </div>
      )}
    </fieldset>
  );
};
