import { type KeyboardEvent, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Input } from "../Input";
import type { NumberInputProps } from "./NumberInput.types";
import { NUMBER_INPUT_LABELS } from "./NumberInput.consts";
import { decimalsOf, formatNumber, parseNumber, settleNumber } from "./NumberInput.utils";
import "./NumberInput.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A number field with the spinbutton keyboard, steppers and locale formatting. */
export const NumberInput = ({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  step = 1,
  largeStep = step * 10,
  precision = decimalsOf(step),
  locale = "en-US",
  formatOptions,
  hideStepper = false,
  labels,
  stepperClassName,
  stepperStyle,
  incrementClassName,
  incrementStyle,
  decrementClassName,
  decrementStyle,
  className,
  name,
  disabled = false,
  readonly = false,
  onFocus,
  onBlur,
  onKeyDown,
  ...inputProps
}: NumberInputProps) => {
  const text = { ...NUMBER_INPUT_LABELS, ...labels };
  const options = { maximumFractionDigits: precision, ...formatOptions };
  const [ownValue, setOwnValue] = useState(defaultValue);
  const current = value === undefined ? ownValue : value;
  // The text being edited; null while the field shows the formatted value.
  const [draft, setDraft] = useState<string | null>(null);
  const locked = disabled || readonly;

  const show = (number: number | null, grouping = true) =>
    number === null
      ? ""
      : formatNumber(number, locale, grouping ? options : { ...options, useGrouping: false });

  const commit = (next: number | null) => {
    const settled = next === null ? null : settleNumber(next, precision, min, max);
    setOwnValue(settled);
    if (settled !== current) onChange?.(settled);
    return settled;
  };

  const typed = () => {
    const parsed = draft === null ? current : parseNumber(draft, locale, options);
    return parsed === undefined ? current : parsed;
  };

  const moveTo = (next: number) => {
    const settled = commit(next);
    if (draft !== null) setDraft(show(settled, false));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || locked) return;
    const from = typed() ?? 0;
    if (event.key === "ArrowUp") moveTo(from + step);
    else if (event.key === "ArrowDown") moveTo(from - step);
    else if (event.key === "PageUp") moveTo(from + largeStep);
    else if (event.key === "PageDown") moveTo(from - largeStep);
    else if (event.key === "Home" && min !== undefined) moveTo(min);
    else if (event.key === "End" && max !== undefined) moveTo(max);
    else {
      // Enter submits the form: settle the typed number first.
      if (event.key === "Enter") setDraft(show(commit(typed()), false));
      return;
    }
    event.preventDefault();
  };

  const stepButton = (direction: 1 | -1) => {
    const atLimit = current !== null && (direction > 0 ? current >= (max ?? Infinity) : current <= (min ?? -Infinity));
    const increment = direction > 0;
    return (
      <button
        type="button"
        // Steppers stay out of the Tab order: the arrow keys do the same from the field.
        tabIndex={-1}
        className={join(
          "number-input__button",
          increment ? "number-input__increment" : "number-input__decrement",
          increment ? incrementClassName : decrementClassName,
        )}
        style={increment ? incrementStyle : decrementStyle}
        aria-label={increment ? text.increment : text.decrement}
        disabled={locked || atLimit}
        // Keeps the focus, and the text being edited, in the field.
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => moveTo((typed() ?? 0) + direction * step)}
      >
        {increment ? <Plus aria-hidden="true" /> : <Minus aria-hidden="true" />}
      </button>
    );
  };

  return (
    <>
      <Input
        {...inputProps}
        className={join("number-input", className)}
        type="text"
        inputMode="decimal"
        role="spinbutton"
        autoComplete="off"
        aria-valuenow={current ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={current === null ? undefined : show(current)}
        disabled={disabled}
        readonly={readonly}
        value={draft ?? show(current)}
        suffix={
          hideStepper ? undefined : (
            <span className={join("number-input__stepper", stepperClassName)} style={stepperStyle}>
              {stepButton(-1)}
              {stepButton(1)}
            </span>
          )
        }
        onChange={setDraft}
        onFocus={(event) => {
          onFocus?.(event);
          setDraft(show(current, false));
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (draft !== null) {
            const parsed = parseNumber(draft, locale, options);
            if (parsed !== undefined) commit(parsed);
          }
          setDraft(null);
        }}
        onKeyDown={handleKeyDown}
      />
      {name && <input type="hidden" name={name} value={current ?? ""} disabled={disabled} />}
    </>
  );
};
