import { useId } from "react";
import type { CSSProperties } from "react";
import type { TextareaProps } from "./Textarea.types";
import "../../css/field.css";
import "./Textarea.styles.css";

export const Textarea = ({
  className,
  wrapperStyle,
  labelClassName,
  labelStyle,
  requiredClassName,
  requiredStyle,
  textareaClassName,
  textareaStyle,
  descriptionClassName,
  descriptionStyle,
  errorClassName,
  errorStyle,
  variant = "auto",
  labelPlacement = "auto",
  size = "medium",
  id,
  label,
  description,
  error,
  placeholder,
  disabled = false,
  readonly = false,
  required = false,
  rows = 3,
  maxRows,
  autoResize = false,
  onChange,
  "aria-describedby": describedBy,
  ...native
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${textareaId}-description`;
  const errorId = `${textareaId}-error`;

  return (
    <div
      className={["textarea__wrapper field-presentation", className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-label-placement={labelPlacement}
      data-size={size}
      style={wrapperStyle}
    >
      {label && (
        <label
          htmlFor={textareaId}
          className={[
            "textarea__label",
            error && "textarea__label--error",
            disabled && "textarea__label--disabled",
            labelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
        >
          {label}
          {required && (
            <span
              className={["textarea__required", requiredClassName]
                .filter(Boolean)
                .join(" ")}
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      <textarea
        {...native}
        id={textareaId}
        className={[
          "textarea",
          autoResize && "textarea--auto-resize",
          textareaClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        // Line counts become CSS heights in lh, so rows and maxRows also hold when the field grows with its content.
        style={
          {
            "--textarea-rows": rows,
            "--textarea-max-rows": maxRows,
            ...textareaStyle,
          } as CSSProperties
        }
        rows={rows}
        placeholder={placeholder || " "}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [describedBy, description != null && descriptionId, error && errorId]
            .filter(Boolean)
            .join(" ") || undefined
        }
        onChange={(event) => onChange?.(event.target.value)}
      />
      {description != null && (
        <div
          id={descriptionId}
          className={["field__description", descriptionClassName]
            .filter(Boolean)
            .join(" ")}
          style={descriptionStyle}
        >
          {description}
        </div>
      )}
      {error && (
        <div
          id={errorId}
          className={["textarea__error-message", errorClassName]
            .filter(Boolean)
            .join(" ")}
          style={errorStyle}
        >
          {error}
        </div>
      )}
    </div>
  );
};
