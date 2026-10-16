import { useId } from "react";
import { usePopover } from "../../../../hooks/usePopover";
import "../../../../css/field.css";
import "./PickerField.styles.css";
import type { PickerFieldProps } from "./PickerField.types";

export const PickerField = ({
  placeholderClassName,
  placeholderStyle,
  className,
  containerClassName,
  containerStyle,
  dropdownClassName,
  dropdownStyle,
  errorClassName,
  fieldClassName,
  iconClassName,
  iconStyle,
  labelClassName,
  panelClassName,
  requiredClassName,
  requiredStyle,
  style,
  valueClassName,
  valueStyle,
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
      className={[
        `picker-field field-presentation ${prefix}__wrapper`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      data-variant={variant}
      data-label-placement={labelPlacement}
      data-size={size}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={fieldId}
          className={[
            [
              "picker-field__label",
              `${prefix}__label`,
              ...states(`${prefix}__label`),
            ].join(" "),
            labelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
        >
          {label}
          {required && (
            <span
              className={[
                `picker-field__required ${prefix}__required`,
                requiredClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={requiredStyle}
              aria-hidden
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className={[
          `picker-field__container ${prefix}__container`,
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={containerStyle}
      >
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          className={[
            [
              "picker-field__field",
              `${prefix}__field`,
              ...states(`${prefix}__field`),
              displayValue && `${prefix}__field--has-value`,
              open && "picker-field__field--open",
            ]
              .filter(Boolean)
              .join(" "),
            fieldClassName,
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
            className={[
              displayValue
                ? "picker-field__value"
                : "picker-field__placeholder",
              displayValue ? valueClassName : placeholderClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={displayValue ? valueStyle : placeholderStyle}
          >
            {displayValue || placeholder}
          </span>
          <Icon
            className={["picker-field__icon", iconClassName]
              .filter(Boolean)
              .join(" ")}
            style={iconStyle}
            aria-hidden
          />
        </button>

        <div
          ref={popoverRef}
          id={id}
          popover="manual"
          role="dialog"
          aria-label={pickerLabel}
          className={["picker-field__popover", panelClassName]
            .filter(Boolean)
            .join(" ")}
          style={panelStyle}
        >
          {open && (
            <div
              className={[`${prefix}__dropdown`, dropdownClassName]
                .filter(Boolean)
                .join(" ")}
              style={dropdownStyle}
            >
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
          className={[
            `picker-field__error ${prefix}__error-message`,
            errorClassName,
          ]
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
