import { useState } from "react";
import { focusItem } from "../../utils/focusItem";
import { ToggleContext } from "../Toggle";
import type { ToggleGroupProps } from "./ToggleGroup.types";
import { TOGGLE_ITEM } from "./ToggleGroup.consts";
import { enabledValues, toList } from "./ToggleGroup.utils";
import "./ToggleGroup.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Toggles that share one choice (`single`) or several (`multiple`), with arrow keys between them. */
export const ToggleGroup = (props: ToggleGroupProps) => {
  const {
    type = "single",
    value,
    defaultValue,
    onChange,
    label,
    orientation = "horizontal",
    size,
    disabled = false,
    children,
    className,
    onKeyDown,
    ...native
  } = props;
  const [uncontrolled, setUncontrolled] = useState(() => toList(defaultValue));
  const [focused, setFocused] = useState<string>();
  const selected = value === undefined ? uncontrolled : toList(value);
  const enabled = enabledValues(children);
  // Tab reaches one toggle: the last one focused, else the first pressed, else the first.
  const tabStop = [focused, ...selected, enabled[0]].find(
    (candidate) => candidate !== undefined && enabled.includes(candidate),
  );

  const toggle = (item: string) => {
    if (type === "single" && selected[0] === item) return;
    const next = type === "single"
      ? [item]
      : selected.includes(item) ? selected.filter((entry) => entry !== item) : [...selected, item];
    if (value === undefined) setUncontrolled(next);
    if (!onChange) return;
    if (props.type === "multiple") props.onChange?.(next);
    else props.onChange?.(item);
  };

  return (
    <div
      {...native}
      role={type === "single" ? "radiogroup" : "group"}
      aria-label={label}
      className={join("toggle-group", className)}
      data-orientation={orientation}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
        const keys = orientation === "vertical"
          ? ["ArrowDown", "ArrowUp"] as const
          : rtl ? ["ArrowLeft", "ArrowRight"] as const : ["ArrowRight", "ArrowLeft"] as const;
        if (!focusItem(event.currentTarget, event.key, TOGGLE_ITEM, keys)) return;
        event.preventDefault();
        // Like radios, a single choice follows the focus.
        if (type === "single") (document.activeElement as HTMLElement | null)?.click();
      }}
    >
      <ToggleContext.Provider value={{ type, value: selected, tabStop, size, disabled, toggle, focus: setFocused }}>
        {children}
      </ToggleContext.Provider>
    </div>
  );
};
