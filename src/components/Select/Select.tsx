import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { usePopover } from "../../hooks/usePopover";
import "./Select.styles.css";
import { SelectProps } from "./Select.types";
import { SelectListbox } from "./components/SelectListbox";

export const Select = ({
  name,
  value,
  defaultValue,
  placeholder,
  label,
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
    <div className="select__wrapper">
      {displayLabel && (
        <label
          htmlFor={fieldId}
          className={`select__label${error ? " select__label--error" : ""}${
            disabled ? " select__label--disabled" : ""
          }`}
        >
          {displayLabel}
        </label>
      )}
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <div
        ref={anchorRef}
        className={`select__field${error ? " select__field--error" : ""}${
          disabled ? " select__field--disabled" : ""
        }${open ? " select__field--open" : ""}`}
        style={fieldStyle}
      >
        <button
          ref={triggerRef}
          id={fieldId}
          type="button"
          role="combobox"
          className="select__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id}
          aria-label={displayLabel ? undefined : "Selecciona una opción"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={toggle}
        >
          <span
            className={selectedLabel ? "select__value" : "select__placeholder"}
          >
            {selectedLabel || placeholder || "Selecciona una opción..."}
          </span>
        </button>
        <ChevronDown className="select__caret" aria-hidden />
      </div>
      <SelectListbox
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
      {error && (
        <div id={errorId} className="select__error-message">
          {error}
        </div>
      )}
    </div>
  );
};
