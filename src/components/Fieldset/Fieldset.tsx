import { useId } from "react";
import type { FieldsetProps } from "./Fieldset.types";
import "../../css/field.css";
import "./Fieldset.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A native fieldset with its legend, help text and error around several controls. */
export const Fieldset = ({
  label,
  description,
  error,
  required = false,
  disabled = false,
  children,
  className,
  style,
  labelClassName,
  labelStyle,
  requiredClassName,
  requiredStyle,
  descriptionClassName,
  descriptionStyle,
  contentClassName,
  contentStyle,
  errorClassName,
  errorStyle,
  "aria-describedby": describedBy,
  ...native
}: FieldsetProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  return (
    <fieldset
      {...native}
      className={join("fieldset", invalid && "fieldset--invalid", className)}
      style={style}
      disabled={disabled}
      aria-describedby={
        join(describedBy, description != null && descriptionId, invalid && errorId) || undefined
      }
    >
      {label ? (
        <legend className={join("fieldset__label", labelClassName)} style={labelStyle}>
          {label}
          {required && (
            <span
              className={join("fieldset__required", requiredClassName)}
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </legend>
      ) : null}
      {description != null && (
        <div
          id={descriptionId}
          className={join("field__description", descriptionClassName)}
          style={descriptionStyle}
        >
          {description}
        </div>
      )}
      <div className={join("fieldset__content", contentClassName)} style={contentStyle}>
        {children}
      </div>
      {invalid && (
        <div id={errorId} className={join("fieldset__error", errorClassName)} style={errorStyle}>
          {error}
        </div>
      )}
    </fieldset>
  );
};
