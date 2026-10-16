import { Check } from "lucide-react";
import { useMemo, useState, type KeyboardEvent } from "react";
import { focusMenuItem } from "../../../hooks/usePopover";
import { OPTION } from "../Select.consts";
import type { SelectListboxContentProps } from "./SelectListboxContent.types";

export const SelectListboxContent = ({
  id,
  panel,
  hide,
  label,
  options,
  multiple = false,
  isSelected,
  onSelect,
  viewSearchBar,
  searchBarPlaceholder,
  optionStyle,
}: SelectListboxContentProps) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, query],
  );

  const onKeyDown = (event: KeyboardEvent) => {
    const inSearch = event.target instanceof HTMLInputElement;
    if (inSearch && (event.key === "Home" || event.key === "End")) return;
    if (focusMenuItem(panel.current, event.key, OPTION)) {
      event.preventDefault();
    } else if (event.key === "Tab") {
      hide();
    }
  };

  const choose = (value: string) => {
    onSelect(value);
    if (!multiple) hide(true);
  };

  return (
    <div className="select__panel" onKeyDown={onKeyDown}>
      {viewSearchBar && (
        <div className="select__search">
          <input
            type="search"
            className="select__search-input"
            placeholder={searchBarPlaceholder}
            aria-label={searchBarPlaceholder}
            aria-controls={id}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <div
        id={id}
        role="listbox"
        aria-label={label}
        aria-multiselectable={multiple || undefined}
        className="select__list"
      >
        {filtered.map((option) => {
          const value = option.value ?? "";
          const selected = isSelected(value);
          return (
            <div
              key={value}
              role="option"
              tabIndex={-1}
              aria-selected={selected}
              className={`select__option${selected ? " select__option--selected" : ""}`}
              style={optionStyle}
              onClick={() => choose(value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  choose(value);
                }
              }}
            >
              {multiple && (
                <span
                  className={`checkbox${selected ? " checkbox--checked" : ""}`}
                  aria-hidden
                >
                  <span className="checkbox__box">
                    <Check className="checkbox__icon" />
                  </span>
                </span>
              )}
              <span className="select__option-label">{option.label}</span>
              {!multiple && selected && (
                <Check className="select__option-check" aria-hidden />
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="select__empty">Sin resultados</div>
        )}
      </div>
    </div>
  );
};
