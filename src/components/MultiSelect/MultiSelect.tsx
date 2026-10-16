import { ChevronDown, X } from "lucide-react";
import { useId, useState } from "react";
import { usePopover } from "../../hooks/usePopover";
import "../Checkbox/Checkbox.styles.css";
import "../Select/Select.styles.css";
import { SelectListbox } from "../Select/components/SelectListbox";
import "./MultiSelect.styles.css";
import { MultiSelectProps } from "./MultiSelect.types";

export const MultiSelect = ({
  name,
  placeholder,
  label,
  error,
  options,
  value = [],
  defaultValue = [],
  disabled = false,
  viewSearchBar = true,
  searchBarPlaceholder = "Buscar...",
  fieldStyle,
  tagStyle,
  listStyle,
  optionStyle,
  onChange,
}: MultiSelectProps) => {
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const selectedValues = value.length > 0 ? value : internalValues;
  const selectedOptions = selectedValues.map(
    (selected) =>
      options.find((option) => option.value === selected) ?? {
        value: selected,
        label: selected,
      },
  );
  const displayLabel = label || placeholder;
  const fieldId = useId();
  const errorId = useId();
  const popover = usePopover({
    initialFocus: viewSearchBar ? ".select__search-input" : '[role="option"]',
  });
  const { id, open, triggerRef, anchorRef, toggle } = popover;

  const update = (next: string[]) => {
    setInternalValues(next);
    onChange?.(next);
  };

  const toggleValue = (optionValue: string) => {
    if (!optionValue) return;
    update(
      selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue],
    );
  };

  return (
    <div className="select__wrapper multiselect">
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
      {selectedValues.map((selected, index) => (
        <input
          key={index}
          type="hidden"
          name={`${name}[${index}]`}
          value={selected}
        />
      ))}
      <div
        ref={anchorRef}
        className={`select__field${error ? " select__field--error" : ""}${
          disabled ? " select__field--disabled" : ""
        }${open ? " select__field--open" : ""}`}
        style={fieldStyle}
      >
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className="multiselect__tag"
            style={tagStyle}
          >
            {option.label}
            {!disabled && (
              <button
                type="button"
                className="multiselect__tag-remove"
                aria-label={`Quitar ${option.label}`}
                onClick={() =>
                  update(selectedValues.filter((v) => v !== option.value))
                }
              >
                <X aria-hidden />
              </button>
            )}
          </span>
        ))}
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
          aria-label={displayLabel ? undefined : "Selecciona opciones"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={toggle}
        >
          {selectedOptions.length === 0 ? (
            <span className="select__placeholder">{placeholder}</span>
          ) : (
            <span className="select__sr-only">
              {selectedOptions.map((option) => option.label).join(", ")}
            </span>
          )}
        </button>
        <ChevronDown className="select__caret" aria-hidden />
      </div>
      <SelectListbox
        popover={popover}
        label={displayLabel || "Opciones"}
        options={options}
        multiple
        isSelected={(optionValue) => selectedValues.includes(optionValue)}
        onSelect={toggleValue}
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
