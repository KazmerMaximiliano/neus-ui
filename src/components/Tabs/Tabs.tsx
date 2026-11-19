import { useId, useState } from "react";
import { focusItem } from "../../utils/focusItem";
import type { TabsProps } from "./Tabs.types";
import { TAB } from "./Tabs.consts";
import "./Tabs.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

export const Tabs = ({
  items,
  value,
  defaultValue,
  onChange,
  label,
  variant = "line",
  className,
  listClassName,
  listStyle,
  tabClassName,
  tabStyle,
  panelClassName,
  panelStyle,
  ...props
}: TabsProps) => {
  const id = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const wanted = value ?? uncontrolledValue;
  const selected = items.some((item) => item.value === wanted && !item.disabled)
    ? wanted
    : items.find((item) => !item.disabled)?.value;

  const select = (next: string) => {
    if (next === selected) return;
    if (value === undefined) setUncontrolledValue(next);
    onChange?.(next);
  };

  return (
    <div {...props} className={join("tabs", `tabs--${variant}`, className)}>
      <div
        role="tablist"
        aria-label={label}
        className={join("tabs__list", listClassName)}
        style={listStyle}
        onKeyDown={(event) => {
          const keys = getComputedStyle(event.currentTarget).direction === "rtl"
            ? ["ArrowLeft", "ArrowRight"] as const
            : ["ArrowRight", "ArrowLeft"] as const;
          if (!focusItem(event.currentTarget, event.key, TAB, keys)) return;
          event.preventDefault();
          // Tabs activate as focus reaches them.
          (document.activeElement as HTMLElement | null)?.click();
        }}
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={item.value === selected}
            tabIndex={item.value === selected ? 0 : -1}
            disabled={item.disabled}
            className={join("tabs__tab", tabClassName)}
            style={tabStyle}
            onClick={() => select(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          hidden={item.value !== selected}
          className={join("tabs__panel", panelClassName)}
          style={panelStyle}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};
