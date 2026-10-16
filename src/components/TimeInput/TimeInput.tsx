import { Clock3 } from "lucide-react";
import { useState } from "react";
import { Clock } from "../Clock/Clock";
import { PickerField } from "../DateInput/components/PickerField/PickerField";
import { TimeValue } from "../Clock/Clock.types";
import { TimeInputProps } from "./TimeInput.types";
import { serializeTimeValue } from "./TimeInput.utils";

export const TimeInput = (props: TimeInputProps) => {
  const {
    variant,
    labelPlacement,
    size,
    panelStyle,
    label,
    name,
    error,
    disabled,
    placeholder,
    readonly,
    value,
    defaultValue,
    required,
    format = "24h",
    fieldStyle,
    labelStyle,
    errorStyle,
    onChange,
  } = props;
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value");
  const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>(
    isControlled ? value : defaultValue,
  );

  const currentValue = isControlled ? value : selectedTime;

  const handleSelect = (newValue: TimeValue | undefined) => {
    if (disabled || readonly) return;
    if (!isControlled) setSelectedTime(newValue);
    onChange?.(newValue);
  };

  return (
    <PickerField
      placeholderClassName={props.placeholderClassName}
      placeholderStyle={props.placeholderStyle}
      className={props.className}
      style={props.style}
      labelClassName={props.labelClassName}
      requiredClassName={props.requiredClassName}
      requiredStyle={props.requiredStyle}
      containerClassName={props.containerClassName}
      containerStyle={props.containerStyle}
      fieldClassName={props.fieldClassName}
      valueClassName={props.valueClassName}
      valueStyle={props.valueStyle}
      iconClassName={props.iconClassName}
      iconStyle={props.iconStyle}
      panelClassName={props.panelClassName}
      dropdownClassName={props.dropdownClassName}
      dropdownStyle={props.dropdownStyle}
      errorClassName={props.errorClassName}
      variant={variant}
      labelPlacement={labelPlacement}
      size={size}
      panelStyle={panelStyle}
      prefix="time-input"
      icon={Clock3}
      label={label}
      placeholder={placeholder}
      displayValue={serializeTimeValue(currentValue, format)}
      pickerLabel={label ? `${label}: reloj` : "Reloj"}
      error={error}
      disabled={disabled}
      readonly={readonly}
      required={required}
      name={name}
      hiddenValue={serializeTimeValue(currentValue, "24h")}
      fieldStyle={fieldStyle}
      labelStyle={labelStyle}
      errorStyle={errorStyle}
    >
      {() => (
        <Clock
          value={currentValue}
          onChange={(newValue) =>
            handleSelect(newValue as TimeValue | undefined)
          }
          disabled={disabled}
          readonly={readonly}
          format={format}
        />
      )}
    </PickerField>
  );
};
