import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePopover } from "../../hooks/usePopover";
import { Chip } from "../Chip";
import { FieldOutline } from "../Input/components/FieldOutline";
import { SelectListbox } from "../Select/components/SelectListbox";
import type { MultiSelectProps } from "./MultiSelect.types";
import { MULTI_SELECT_LABELS } from "./MultiSelect.consts";
import "../Checkbox/Checkbox.styles.css";
import "../Select/Select.styles.css";
import "../../css/field.css";
import "./MultiSelect.styles.css";

export const MultiSelect = ({
  tagRemoveIconClassName,
  tagRemoveIconStyle,
  boxClassName,
  boxStyle,
  checkboxClassName,
  checkboxStyle,
  emptyClassName,
  emptyStyle,
  iconClassName,
  iconStyle,
  listClassName,
  listContentClassName,
  listContentStyle,
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
  placeholderClassName,
  placeholderStyle,
  srOnlyClassName,
  srOnlyStyle,
  style,
  tagClassName,
  tagRemoveClassName,
  tagRemoveStyle,
  triggerClassName,
  triggerStyle,
  name,
  placeholder,
  label,
  description,
  descriptionClassName,
  descriptionStyle,
  error,
  options,
  value = [],
  defaultValue = [],
  disabled = false,
  required = false,
  requiredClassName,
  requiredStyle,
  viewSearchBar = true,
  searchBarPlaceholder = "Search...",
  labels,
  fieldStyle,
  tagStyle,
  listStyle,
  optionStyle,
  variant = "auto",
  labelPlacement = "auto",
  size = "medium",
  onChange,
}: MultiSelectProps) => {
  const [internalValues, setInternalValues] = useState<readonly string[]>(defaultValue);
  const selectedValues = value.length > 0 ? value : internalValues;
  const selectedOptions = selectedValues.map(
    (selected) =>
      options.find((option) => option.value === selected) ?? {
        value: selected,
        label: selected,
      },
  );
  const displayLabel = label || placeholder;
  const text = { ...MULTI_SELECT_LABELS, ...labels };
  const fieldId = useId();
  const errorId = useId();
  const descriptionId = useId();
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
    <div
      className={["select__wrapper field-presentation multiselect", className]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-label-placement={labelPlacement}
      data-size={size}
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
          {required && (
            <span
              className={["select__required", requiredClassName].filter(Boolean).join(" ")}
              style={requiredStyle}
              aria-hidden="true"
            >
              *
            </span>
          )}
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
        {selectedOptions.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            size="small"
            className={["multiselect__tag", tagClassName].filter(Boolean).join(" ")}
            style={tagStyle}
            removeClassName={["multiselect__tag-remove", tagRemoveClassName].filter(Boolean).join(" ")}
            removeStyle={tagRemoveStyle}
            removeIconClassName={["multiselect__tag-remove-icon", tagRemoveIconClassName]
              .filter(Boolean)
              .join(" ")}
            removeIconStyle={tagRemoveIconStyle}
            labels={{ remove: text.remove }}
            onRemove={
              disabled
                ? undefined
                : () => update(selectedValues.filter((v) => v !== option.value))
            }
          />
        ))}
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
          aria-label={displayLabel ? undefined : text.unselected}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={
            [description != null && descriptionId, error && errorId]
              .filter(Boolean)
              .join(" ") || undefined
          }
          onClick={toggle}
        >
          {selectedOptions.length === 0 ? (
            <span
              className={["select__placeholder", placeholderClassName]
                .filter(Boolean)
                .join(" ")}
              style={placeholderStyle}
            >
              {placeholder}
            </span>
          ) : (
            <span
              className={["select__sr-only", srOnlyClassName]
                .filter(Boolean)
                .join(" ")}
              style={srOnlyStyle}
            >
              {selectedOptions.map((option) => option.label).join(", ")}
            </span>
          )}
        </button>
        <ChevronDown
          className={["select__caret", caretClassName]
            .filter(Boolean)
            .join(" ")}
          style={caretStyle}
          aria-hidden
        />
        <FieldOutline label={displayLabel} required={required} />
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
        checkboxClassName={checkboxClassName}
        checkboxStyle={checkboxStyle}
        boxClassName={boxClassName}
        boxStyle={boxStyle}
        iconClassName={iconClassName}
        iconStyle={iconStyle}
        optionLabelClassName={optionLabelClassName}
        optionLabelStyle={optionLabelStyle}
        emptyClassName={emptyClassName}
        emptyStyle={emptyStyle}
        popover={popover}
        label={displayLabel || text.options}
        options={options}
        multiple
        isSelected={(optionValue) => selectedValues.includes(optionValue)}
        onSelect={toggleValue}
        viewSearchBar={viewSearchBar}
        searchBarPlaceholder={searchBarPlaceholder}
        emptyLabel={text.empty}
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
