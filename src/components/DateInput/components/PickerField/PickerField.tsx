import { useId } from "react";
import { usePopover } from "../../../../hooks/usePopover";
import "../../../../css/field.css";
import "./PickerField.styles.css";
import type { PickerFieldProps } from "./PickerField.types";

export const PickerField = ({
  variant = "auto",
  labelPlacement = "auto",
  size = "medium",
  panelStyle,
  prefix,
  icon: Icon,
  label,
  placeholder,
  displayValue,
  pickerLabel,
  error,
  disabled = false,
  readonly = false,
  required = false,
  name,
  hiddenValue,
  fieldStyle,
  labelStyle,
  errorStyle,
  children,
}: PickerFieldProps) => {
  const fieldId = useId();
  const labelId = useId();
  const valueId = useId();
  const errorId = useId();
  const { id, open, triggerRef, popoverRef, toggle, hide } = usePopover({
    initialFocus: ".rdp-day_button[tabindex='0'], [role='slider']",
  });
  const states = (block: string) =>
    [
      error && `${block}--error`,
      disabled && `${block}--disabled`,
      readonly && `${block}--readonly`,
    ].filter(Boolean);

  return (
    <div
      className={`picker-field field-presentation ${prefix}__wrapper`}
      data-variant={variant}
      data-label-placement={labelPlacement}
      data-size={size}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={fieldId}
          className={[
            "picker-field__label",
            `${prefix}__label`,
            ...states(`${prefix}__label`),
          ].join(" ")}
          style={labelStyle}
        >
          {label}
          {required && (
            <span
              className={`picker-field__required ${prefix}__required`}
              aria-hidden
            >
              *
            </span>
          )}
        </label>
      )}

      <div className={`picker-field__container ${prefix}__container`}>
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          className={[
            "picker-field__field",
            `${prefix}__field`,
            ...states(`${prefix}__field`),
            displayValue && `${prefix}__field--has-value`,
            open && "picker-field__field--open",
          ]
            .filter(Boolean)
            .join(" ")}
          style={fieldStyle}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={id}
          aria-labelledby={label ? `${labelId} ${valueId}` : undefined}
          aria-label={label ? undefined : pickerLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required || undefined}
          onClick={() => !readonly && toggle()}
        >
          <span
            id={valueId}
            className={
              displayValue ? "picker-field__value" : "picker-field__placeholder"
            }
          >
            {displayValue || placeholder}
          </span>
          <Icon className="picker-field__icon" aria-hidden />
        </button>

        <div
          ref={popoverRef}
          id={id}
          popover="manual"
          role="dialog"
          aria-label={pickerLabel}
          className="picker-field__popover"
          style={panelStyle}
        >
          {open && (
            <div className={`${prefix}__dropdown`}>
              {children(() => hide(true))}
            </div>
          )}
        </div>
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={hiddenValue}
          required={required}
        />
      )}

      {error && (
        <div
          id={errorId}
          className={`picker-field__error ${prefix}__error-message`}
          style={errorStyle}
        >
          {error}
        </div>
      )}
    </div>
  );
};
