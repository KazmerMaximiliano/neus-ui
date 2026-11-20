import { useState } from "react";
import { Check, X } from "lucide-react";
import type { ChipProps } from "./Chip.types";
import { CHIP_LABELS } from "./Chip.consts";
import "./Chip.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A compact label that can be a toggle (`selected`), removable (`onRemove`), or both. */
export const Chip = ({
  label,
  icon: Icon,
  selected,
  defaultSelected,
  onSelectedChange,
  onRemove,
  size = "medium",
  disabled = false,
  labels,
  className,
  iconClassName,
  iconStyle,
  actionClassName,
  actionStyle,
  labelClassName,
  labelStyle,
  removeClassName,
  removeStyle,
  removeIconClassName,
  removeIconStyle,
  ...native
}: ChipProps) => {
  const text = { ...CHIP_LABELS, ...labels };
  const [uncontrolled, setUncontrolled] = useState(defaultSelected ?? false);
  const selectable =
    selected !== undefined || defaultSelected !== undefined || onSelectedChange !== undefined;
  const on = selectable && (selected ?? uncontrolled);
  // A selected chip shows a check in place of its icon, so the state does not rest on color.
  const Leading = on ? Check : Icon;
  const content = (
    <>
      {Leading && (
        <Leading
          className={join("chip__icon", on && "chip__check", iconClassName)}
          style={iconStyle}
          aria-hidden
        />
      )}
      <span className={join("chip__label", labelClassName)} style={labelStyle}>
        {label}
      </span>
    </>
  );

  return (
    <span
      {...native}
      className={join("chip", className)}
      data-size={size}
      data-selected={on || undefined}
      data-disabled={disabled || undefined}
    >
      {selectable ? (
        <button
          type="button"
          className={join("chip__action", actionClassName)}
          style={actionStyle}
          aria-pressed={on}
          disabled={disabled}
          onClick={() => {
            if (selected === undefined) setUncontrolled(!on);
            onSelectedChange?.(!on);
          }}
        >
          {content}
        </button>
      ) : (
        content
      )}
      {onRemove && (
        <button
          type="button"
          className={join("chip__remove", removeClassName)}
          style={removeStyle}
          aria-label={text.remove(label)}
          disabled={disabled}
          onClick={onRemove}
        >
          <X className={join("chip__remove-icon", removeIconClassName)} style={removeIconStyle} aria-hidden />
        </button>
      )}
    </span>
  );
};
