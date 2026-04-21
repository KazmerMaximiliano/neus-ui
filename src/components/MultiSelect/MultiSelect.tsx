import { useEffect, useRef, useState, useMemo } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
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
  onChange,
}: MultiSelectProps) => {
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const selectedValues = value.length > 0 ? value : internalValues;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const displayLabel = label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (value?: string | null) => {
    if (disabled) return;
    if (value) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      setInternalValues(newValues);
      onChange?.(newValues);
    }
  };

  const handleRemoveTag = (valueToRemove: string) => {
    if (disabled) return;

    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setInternalValues(newValues);
    onChange?.(newValues);
  };

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const selectedLabels = selectedValues.map(
    (value) => options.find((option) => option.value === value)?.label || value,
  );

  return (
    <div className="multiselect__wrapper">
      {displayLabel && (
        <label
          className={`multiselect__label${error ? " multiselect__label--error" : ""}${
            disabled ? " multiselect__label--disabled" : ""
          }`}
        >
          {displayLabel}
        </label>
      )}
      {selectedValues.map((value, index) => (
        <input
          key={index}
          type="hidden"
          name={`${name}[${index}]`}
          value={value}
        />
      ))}

      <div
        className={`multiselect__container${isOpen && !disabled ? " multiselect__container--open" : ""}`}
      >
        <div
          className={`multiselect${error ? " multiselect--error" : ""}${
            disabled ? " multiselect--disabled" : ""
          }`}
          onClick={() => {
            if (!disabled) {
              if (isOpen) setSearchQuery("");
              setIsOpen(!isOpen);
            }
          }}
          tabIndex={disabled ? -1 : 0}
        >
          {selectedValues.length === 0 ? (
            <span className="multiselect__placeholder">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => (
              <span key={index} className="multiselect__tag">
                {label}
                {!disabled && (
                  <span
                    className="multiselect__tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(selectedValues[index]);
                    }}
                  >
                    ×
                  </span>
                )}
              </span>
            ))
          )}
        </div>

        <div
          className={`multiselect__dropdown${isOpen && !disabled ? " multiselect__dropdown--open" : ""}`}
        >
          {viewSearchBar && (
            <div className="multiselect__search">
              <input
                type="text"
                className="multiselect__search-input"
                placeholder={searchBarPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="multiselect__option"
              onClick={() => handleToggleOption(option.value)}
            >
              <Checkbox
                checked={selectedValues.includes(option.value ?? "")}
                onChange={() => handleToggleOption(option.value)}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="multiselect__error-message">{error}</div>
    </div>
  );
};
