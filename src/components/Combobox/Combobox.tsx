import { type KeyboardEvent, useEffect, useLayoutEffect, useState } from "react";
import { usePopover } from "../../hooks/usePopover";
import { Input } from "../Input";
import { PopoverPanel } from "../Popover/components/PopoverPanel";
import { filterOptions } from "../Select";
import { Spinner } from "../Spinner";
import type { SelectOption } from "../Select";
import type { ComboboxProps } from "./Combobox.types";
import { COMBOBOX_LABELS } from "./Combobox.consts";
import "../Select/Select.styles.css";
import "./Combobox.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A text field that suggests options as you type, with the listbox popup pattern. */
export const Combobox = ({
  options,
  value,
  defaultValue,
  onChange,
  inputValue,
  onInputChange,
  filter = true,
  allowCustomValue = false,
  loading = false,
  emptyLabel = COMBOBOX_LABELS.empty,
  loadingLabel = COMBOBOX_LABELS.loading,
  listClassName,
  listStyle,
  optionClassName,
  optionStyle,
  statusClassName,
  statusStyle,
  className,
  name,
  suffix,
  disabled,
  readonly,
  label,
  "aria-label": ariaLabel,
  onKeyDown,
  onBlur,
  onClick,
  ...inputProps
}: ComboboxProps) => {
  const labelOf = (current: string) =>
    options.find((option) => (option.value ?? "") === current)?.label ?? current;
  const [ownValue, setOwnValue] = useState(defaultValue ?? "");
  const selected = value ?? ownValue;
  const [ownText, setOwnText] = useState(() => labelOf(selected));
  const text = inputValue ?? ownText;
  // The text that stands for the value; leaving the field without a choice brings it back.
  const [committed, setCommitted] = useState(() => labelOf(selected));
  const [lastValue, setLastValue] = useState(selected);
  const [active, setActive] = useState(-1);
  const { id, open, triggerRef, popoverRef, anchorRef, show, hide } = usePopover<
    HTMLInputElement,
    HTMLDivElement,
    HTMLElement
  >();

  // A value set from outside (a form reset) shows its label.
  if (selected !== lastValue) {
    setLastValue(selected);
    setCommitted(labelOf(selected));
    if (inputValue === undefined) setOwnText(labelOf(selected));
  }

  // While the field shows the chosen label, every option is offered.
  const visible = filter ? filterOptions(options, text === committed ? "" : text) : options;
  const current = active < visible.length ? active : -1;
  const optionId = (index: number) => `${id}-option-${index}`;

  // The list lines up with the whole field, not just the text box.
  useLayoutEffect(() => {
    anchorRef.current = triggerRef.current?.closest<HTMLElement>(".input__control") ?? null;
  }, [anchorRef, triggerRef]);

  useEffect(() => {
    if (open && current >= 0) document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
  });

  const setText = (next: string) => {
    if (inputValue === undefined) setOwnText(next);
    onInputChange?.(next);
  };

  const commit = (nextValue: string, nextText: string) => {
    hide();
    setActive(-1);
    setCommitted(nextText);
    if (nextText !== text) setText(nextText);
    if (nextValue === selected) return;
    if (value === undefined) setOwnValue(nextValue);
    onChange?.(nextValue);
  };

  const choose = (option: SelectOption) => commit(option.value ?? "", option.label);

  // Leaving or pressing Enter keeps an exact match, the typed text when allowed, or the last choice.
  const settle = () => {
    if (text === committed) return hide();
    const match = options.find((option) => option.label.toLowerCase() === text.trim().toLowerCase());
    if (match) choose(match);
    else if (allowCustomValue || text === "") commit(text, text);
    else commit(selected, committed);
  };

  const move = (step: 1 | -1) => {
    if (!open) {
      show();
      const chosen = visible.findIndex((option) => (option.value ?? "") === selected);
      setActive(chosen >= 0 ? chosen : step === 1 ? 0 : visible.length - 1);
      return;
    }
    if (visible.length > 0) setActive((current + step + visible.length) % visible.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || readonly) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && open && current >= 0) {
      event.preventDefault();
      choose(visible[current]);
    } else if (event.key === "Enter") {
      settle();
    }
  };

  return (
    <>
      <Input
        {...inputProps}
        ref={triggerRef}
        className={join("combobox", className)}
        role="combobox"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={id}
        aria-activedescendant={open && current >= 0 ? optionId(current) : undefined}
        autoComplete="off"
        label={label}
        disabled={disabled}
        readonly={readonly}
        value={text}
        suffix={loading ? <Spinner size="small" /> : suffix}
        onChange={(next) => {
          setText(next);
          setActive(-1);
          show();
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!readonly) show();
        }}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          onBlur?.(event);
          settle();
        }}
      />
      {name && <input type="hidden" name={name} value={selected} disabled={disabled} />}
      <PopoverPanel
        ref={popoverRef}
        className={join("select__popover combobox__list", listClassName)}
        style={listStyle}
      >
        <div
          id={id}
          role="listbox"
          aria-label={label ?? ariaLabel}
          aria-busy={loading || undefined}
        >
          {open && visible.map((option, index) => {
            const isSelected = (option.value ?? "") === selected;
            return (
              <div
                key={option.value ?? ""}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                className={join(
                  "select__option combobox__option",
                  isSelected && "select__option--selected",
                  index === current && "combobox__option--active",
                  optionClassName,
                )}
                style={optionStyle}
                // The field keeps focus, so typing can go on after a click.
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
              >
                <span className="select__option-label">{option.label}</span>
              </div>
            );
          })}
        </div>
        {open && visible.length === 0 && (
          <div role="status" className={join("select__empty combobox__status", statusClassName)} style={statusStyle}>
            {loading ? loadingLabel : emptyLabel}
          </div>
        )}
      </PopoverPanel>
    </>
  );
};
