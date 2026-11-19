import { type SyntheticEvent, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AccordionProps } from "./Accordion.types";
import "./Accordion.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

export const Accordion = ({
  items,
  type = "multiple",
  value,
  defaultValue = [],
  onChange,
  titleAs: Title,
  className,
  itemClassName,
  itemStyle,
  headerClassName,
  headerStyle,
  contentClassName,
  contentStyle,
  ...props
}: AccordionProps) => {
  const name = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState<readonly string[]>(defaultValue);
  const open = value ?? uncontrolledValue;

  const request = (item: string, opened: boolean) => {
    if (open.includes(item) === opened) return;
    const next = opened ? (type === "single" ? [item] : [...open, item]) : open.filter((entry) => entry !== item);
    if (value === undefined) setUncontrolledValue(next);
    onChange?.(next);
  };

  return (
    <div {...props} className={join("accordion", className)}>
      {items.map((item) => (
        <details
          key={item.value}
          // Without JavaScript, a shared name still keeps one item open at a time.
          name={type === "single" ? name : undefined}
          open={open.includes(item.value)}
          className={join("accordion__item", itemClassName)}
          style={itemStyle}
          // The browser opens an item by itself to show a find-in-page match.
          onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => {
            if (!item.disabled) request(item.value, event.currentTarget.open);
          }}
        >
          <summary
            aria-disabled={item.disabled || undefined}
            className={join("accordion__header", headerClassName)}
            style={headerStyle}
            onClick={(event) => {
              event.preventDefault();
              if (!item.disabled) request(item.value, !open.includes(item.value));
            }}
          >
            {Title ? <Title className="accordion__title">{item.title}</Title> : <span className="accordion__title">{item.title}</span>}
            <ChevronDown aria-hidden className="accordion__icon" />
          </summary>
          <div className={join("accordion__content", contentClassName)} style={contentStyle}>
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
};
