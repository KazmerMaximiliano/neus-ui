import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../Calendar/Calendar";
import { PickerField } from "./components/PickerField/PickerField";
import { DateInputProps } from "./DateInput.types";
import { formatDateForDisplay, serializeDateValue } from "./DateInput.utils";

export const DateInput = (props: DateInputProps) => {
  const {
    variant,
    labelPlacement,
    size,
    panelStyle,
    label,
    name,
    error,
    disabled,
    mode = "single",
    placeholder,
    readonly,
    value,
    defaultValue,
    required,
    fieldStyle,
    labelStyle,
    errorStyle,
    onChange,
  } = props;
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value");
  const [selectedDate, setSelectedDate] = useState<
    Date | DateRange | undefined
  >(isControlled ? value : defaultValue);

  const currentValue = isControlled ? value : selectedDate;

  const handleSelect = (
    newValue: Date | DateRange | undefined,
    close: () => void,
  ) => {
    if (disabled || readonly) return;
    if (!isControlled) setSelectedDate(newValue);
    onChange?.(newValue);
    if (mode === "single") close();
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
      description={props.description}
      descriptionClassName={props.descriptionClassName}
      descriptionStyle={props.descriptionStyle}
      variant={variant}
      labelPlacement={labelPlacement}
      size={size}
      panelStyle={panelStyle}
      prefix="date-input"
      icon={CalendarDays}
      label={label}
      placeholder={placeholder}
      displayValue={formatDateForDisplay(currentValue, mode)}
      pickerLabel={label ? `${label}: calendario` : "Calendario"}
      error={error}
      disabled={disabled}
      readonly={readonly}
      required={required}
      name={name}
      hiddenValue={serializeDateValue(currentValue)}
      fieldStyle={fieldStyle}
      labelStyle={labelStyle}
      errorStyle={errorStyle}
    >
      {(close) =>
        mode === "single" ? (
          <Calendar
            mode="single"
            value={currentValue instanceof Date ? currentValue : undefined}
            onChange={(newValue) =>
              handleSelect(newValue as Date | DateRange | undefined, close)
            }
            disabled={disabled}
            readonly={readonly}
            required={required}
          />
        ) : (
          <Calendar
            mode="range"
            value={
              currentValue && !(currentValue instanceof Date)
                ? currentValue
                : undefined
            }
            onChange={(newValue) =>
              handleSelect(newValue as Date | DateRange | undefined, close)
            }
            disabled={disabled}
            readonly={readonly}
            required={required}
            numberOfMonths={2}
          />
        )
      }
    </PickerField>
  );
};
