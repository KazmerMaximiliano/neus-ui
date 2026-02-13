import { useEffect, useMemo, useRef, useState } from "react";
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
  const [selectedValues, setSelectedValues] = useState<string[]>(
    value.length > 0 ? value : defaultValue,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const memoizedValue = useMemo(() => value, [value]);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayLabel = label || placeholder;

  // Sync internal state when controlled prop changes
  useEffect(() => {
    if (memoizedValue.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedValues(memoizedValue);
    }
  }, [memoizedValue]);

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

      setSelectedValues(newValues);
      onChange?.(newValues);
    }
  };

  const handleRemoveTag = (valueToRemove: string) => {
    if (disabled) return;

    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
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
    <div className="multiselect-wrapper">
      {displayLabel && (
        <label
          className={`multiselect-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
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
        className={`multiselect-container${isOpen && !disabled ? " open" : ""}`}
      >
        <div
          className={`multiselect${error ? " error" : ""}${
            disabled ? " disabled" : ""
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
            <span className="multiselect-placeholder">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => (
              <span key={index} className="multiselect-tag">
                {label}
                {!disabled && (
                  <span
                    className="multiselect-tag-remove"
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
          className={`multiselect-dropdown${isOpen && !disabled ? " multiselect-dropdown--open" : ""}`}
        >
          {viewSearchBar && (
            <div className="multiselect-search">
              <input
                type="text"
                className="multiselect-search-input"
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
              className="multiselect-option"
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

      <div className="multiselect-error">{error}</div>
    </div>
  );
};
