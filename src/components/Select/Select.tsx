import { useEffect, useMemo, useRef, useState } from "react";
import "./Select.styles.css";
import { SelectProps } from "./Select.types";

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
  onChange,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? "",
  );
  const selectedValue = value ? value : internalValue;
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

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const selectedLabel = options.find(
    (option) => option.value === selectedValue,
  )?.label;

  const handleSelect = (optionValue: string) => {
    if (disabled) return;
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="select__wrapper" ref={containerRef}>
      {displayLabel && (
        <label
          className={`select__label${error ? " select__label--error" : ""}${
            disabled ? " select__label--disabled" : ""
          }`}
        >
          {displayLabel}
        </label>
      )}
      {name && (
        <input type="hidden" name={name} value={selectedValue} />
      )}
      <div className={`select__container${isOpen && !disabled ? " select__container--open" : ""}`}>
        <div
          className={`select${error ? " select--error" : ""}${
            disabled ? " select--disabled" : ""
          }`}
          onClick={() => {
            if (!disabled) {
              if (isOpen) setSearchQuery("");
              setIsOpen(!isOpen);
            }
          }}
          tabIndex={disabled ? -1 : 0}
        >
          <span className={selectedLabel ? "" : "select__placeholder"}>
            {selectedLabel || placeholder || "Selecciona una opción..."}
          </span>
        </div>

        <div className={`select__dropdown${isOpen && !disabled ? " select__dropdown--open" : ""}`}>
          {viewSearchBar && (
            <div className="select__search">
              <input
                type="text"
                className="select__search-input"
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
              className={`select__option${option.value === selectedValue ? " select__option--selected" : ""}`}
              onClick={() => handleSelect(option.value ?? "")}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      {error && <div className="select__error-message">{error}</div>}
    </div>
  );
};
