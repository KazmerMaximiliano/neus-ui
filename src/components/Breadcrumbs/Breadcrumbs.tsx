import { useEffect, useRef, useState } from "react";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import { BREADCRUMBS_LABELS } from "./Breadcrumbs.consts";
import "./Breadcrumbs.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

export const Breadcrumbs = ({
  items,
  maxItems,
  linkComponent: LinkComponent = "a",
  labels,
  className,
  listClassName,
  listStyle,
  itemClassName,
  itemStyle,
  linkClassName,
  linkStyle,
  currentClassName,
  currentStyle,
  expandClassName,
  expandStyle,
  ...props
}: BreadcrumbsProps) => {
  const text = { ...BREADCRUMBS_LABELS, ...labels };
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  // The first item stays, the button stands for the middle ones and the rest are the last ones.
  const collapsed = !expanded && maxItems !== undefined && items.length > Math.max(maxItems, 2);
  const tail = collapsed ? items.length - Math.max(maxItems - 1, 1) : 1;

  // The button leaves with the click, so focus moves to the first item it revealed.
  useEffect(() => {
    if (expanded) listRef.current?.querySelectorAll<HTMLElement>(".breadcrumbs__link")[1]?.focus();
  }, [expanded]);

  const renderItem = ({ label, href }: (typeof items)[number], index: number) => (
    <li key={`${index}-${label}`} className={join("breadcrumbs__item", itemClassName)} style={itemStyle}>
      {index === items.length - 1 ? (
        <span aria-current="page" className={join("breadcrumbs__current", currentClassName)} style={currentStyle}>
          {label}
        </span>
      ) : href === undefined ? (
        label
      ) : (
        <LinkComponent href={href} className={join("breadcrumbs__link", linkClassName)} style={linkStyle}>
          {label}
        </LinkComponent>
      )}
    </li>
  );

  return (
    <nav aria-label={text.navigation} {...props} className={join("breadcrumbs", className)}>
      <ol ref={listRef} className={join("breadcrumbs__list", listClassName)} style={listStyle}>
        {collapsed ? (
          <>
            {renderItem(items[0], 0)}
            <li className={join("breadcrumbs__item", itemClassName)} style={itemStyle}>
              <button
                type="button"
                aria-label={text.expand}
                className={join("breadcrumbs__expand", expandClassName)}
                style={expandStyle}
                onClick={() => setExpanded(true)}
              >
                …
              </button>
            </li>
            {items.slice(tail).map((item, offset) => renderItem(item, tail + offset))}
          </>
        ) : (
          items.map(renderItem)
        )}
      </ol>
    </nav>
  );
};
