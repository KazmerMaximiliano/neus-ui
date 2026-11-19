import { useId } from "react";
import type { FormFieldProps } from "./FormField.types";
import "../../css/field.css";
import "./FormField.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Label, help text and error around one control the library does not wrap itself. */
export const FormField = ({
  label,
  description,
  error,
  required = false,
  disabled = false,
  id,
  children,
  className,
  style,
  labelClassName,
  labelStyle,
  requiredClassName,
  requiredStyle,
  descriptionClassName,
  descriptionStyle,
  errorClassName,
  errorStyle,
}: FormFieldProps) => {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const labelId = `${controlId}-label`;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const invalid = Boolean(error);

  return (
    <div
      className={join(
        "form-field",
        invalid && "form-field--invalid",
        disabled && "form-field--disabled",
        className,
      )}
      style={style}
    >
      <label
        id={labelId}
        htmlFor={controlId}
        className={join("form-field__label", labelClassName)}
        style={labelStyle}
      >
        {label}
        {required && (
          <span
            className={join("form-field__required", requiredClassName)}
            style={requiredStyle}
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>
      {description != null && (
        <div
          id={descriptionId}
          className={join("field__description", descriptionClassName)}
          style={descriptionStyle}
        >
          {description}
        </div>
      )}
      {children({
        id: controlId,
        "aria-labelledby": labelId,
        "aria-describedby":
          join(description != null && descriptionId, invalid && errorId) || undefined,
        "aria-invalid": invalid || undefined,
        "aria-required": required || undefined,
        disabled: disabled || undefined,
      })}
      {invalid && (
        <div id={errorId} className={join("form-field__error", errorClassName)} style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
};
