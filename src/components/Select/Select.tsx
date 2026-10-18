import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { usePopover } from "../../hooks/usePopover";
import { SelectListbox } from "./components/SelectListbox";
import "../../css/field.css";
import "./Select.styles.css";
import { SelectProps } from "./Select.types";

export const Select = ({
  placeholderClassName,
  placeholderStyle,
  emptyClassName,
  emptyStyle,
  listClassName,
  listContentClassName,
  listContentStyle,
  optionCheckClassName,
  optionCheckStyle,
  optionClassName,
  optionLabelClassName,
  optionLabelStyle,
  panelClassName,
  panelStyle,
  searchClassName,
  searchInputClassName,
  searchInputStyle,
  searchStyle,
  caretClassName,
  caretStyle,
  className,
  errorMessageClassName,
  errorMessageStyle,
  fieldClassName,
  labelClassName,
  labelStyle,
  valueClassName,
  valueStyle,
  style,
  triggerClassName,
  triggerStyle,
  name,
  value,
  defaultValue,
  placeholder,
  label,
  description,
  descriptionClassName,
  descriptionStyle,
  error,
  disabled = false,
  viewSearchBar = true,
  searchBarPlaceholder = "Buscar...",
  options,
  fieldStyle,
  listStyle,
  optionStyle,
  onChange,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value ? value : internalValue;
  const selectedLabel = options.find(
    (option) => option.value === selectedValue,
  )?.label;
  const displayLabel = label || placeholder;
  const fieldId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const popover = usePopover({
    initialFocus: viewSearchBar
      ? ".select__search-input"
      : selectedLabel
        ? '[role="option"][aria-selected="true"]'
        : '[role="option"]',
  });
  const { id, open, triggerRef, anchorRef, toggle } = popover;

  const handleSelect = (optionValue: string) => {
    setInternalValue(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div
      className={["select__wrapper", className].filter(Boolean).join(" ")}
      style={style}
    >
      {displayLabel && (
        <label
          htmlFor={fieldId}
          className={[
            `select__label${error ? " select__label--error" : ""}${
              disabled ? " select__label--disabled" : ""
            }`,
            labelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
        >
          {displayLabel}
        </label>
      )}
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <div
        ref={anchorRef}
        className={[
          `select__field${error ? " select__field--error" : ""}${
            disabled ? " select__field--disabled" : ""
          }${open ? " select__field--open" : ""}`,
          fieldClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={fieldStyle}
      >
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          role="combobox"
          className={["select__trigger", triggerClassName]
            .filter(Boolean)
            .join(" ")}
          style={triggerStyle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id}
          aria-label={displayLabel ? undefined : "Selecciona una opción"}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [description != null && descriptionId, error && errorId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onClick={toggle}
        >
          <span
            className={[
              selectedLabel ? "select__value" : "select__placeholder",
              selectedLabel ? valueClassName : placeholderClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={selectedLabel ? valueStyle : placeholderStyle}
          >
            {selectedLabel || placeholder || "Selecciona una opción..."}
          </span>
        </button>
        <ChevronDown
          className={["select__caret", caretClassName]
            .filter(Boolean)
            .join(" ")}
          style={caretStyle}
          aria-hidden
        />
      </div>
      <SelectListbox
        listClassName={listClassName}
        panelClassName={panelClassName}
        panelStyle={panelStyle}
        searchClassName={searchClassName}
        searchStyle={searchStyle}
        searchInputClassName={searchInputClassName}
        searchInputStyle={searchInputStyle}
        listContentClassName={listContentClassName}
        listContentStyle={listContentStyle}
        optionClassName={optionClassName}
        optionLabelClassName={optionLabelClassName}
        optionLabelStyle={optionLabelStyle}
        optionCheckClassName={optionCheckClassName}
        optionCheckStyle={optionCheckStyle}
        emptyClassName={emptyClassName}
        emptyStyle={emptyStyle}
        popover={popover}
        label={displayLabel || "Opciones"}
        options={options}
        isSelected={(optionValue) => optionValue === selectedValue}
        onSelect={handleSelect}
        viewSearchBar={viewSearchBar}
        searchBarPlaceholder={searchBarPlaceholder}
        listStyle={listStyle}
        optionStyle={optionStyle}
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
          className={["select__error-message", errorMessageClassName]
            .filter(Boolean)
            .join(" ")}
          style={errorMessageStyle}
        >
          {error}
        </div>
      )}
    </div>
  );
};
