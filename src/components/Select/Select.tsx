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
  const [selectedValue, setSelectedValue] = useState<string>(
    value ?? defaultValue ?? "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const displayLabel = label || placeholder;

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

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
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="select-wrapper" ref={containerRef}>
      {displayLabel && (
        <label
          className={`select-label${error ? " error" : ""}${
            disabled ? " disabled" : ""
          }`}
        >
          {displayLabel}
        </label>
      )}
      {name && (
        <input type="hidden" name={name} value={selectedValue} />
      )}
      <div className={`select-container${isOpen && !disabled ? " open" : ""}`}>
        <div
          className={`select${error ? " error" : ""}${
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
          <span className={selectedLabel ? "" : "select-placeholder"}>
            {selectedLabel || placeholder || "Selecciona una opción..."}
          </span>
        </div>

        <div className={`select-dropdown${isOpen && !disabled ? " select-dropdown--open" : ""}`}>
          {viewSearchBar && (
            <div className="select-search">
              <input
                type="text"
                className="select-search-input"
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
              className={`select-option${option.value === selectedValue ? " selected" : ""}`}
              onClick={() => handleSelect(option.value ?? "")}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      {error && <div className="select-error">{error}</div>}
    </div>
  );
};
