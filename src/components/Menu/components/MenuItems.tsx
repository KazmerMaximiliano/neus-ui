import { focusMenuItem } from "../../../hooks/usePopover";
import type { MenuItemsProps } from "../Menu.types";

export const MenuItems = ({
  itemClassName,
  menuClassName,
  popover: { id, open, popoverRef, hide },
  label,
  items,
  header,
  menuStyle,
  itemStyle,
}: MenuItemsProps) => (
  <div
    ref={popoverRef}
    id={id}
    popover="manual"
    role="menu"
    aria-label={label}
    className={["menu__panel", menuClassName].filter(Boolean).join(" ")}
    style={menuStyle}
    onKeyDown={(event) => {
      if (focusMenuItem(popoverRef.current, event.key)) event.preventDefault();
      if (event.key === "Tab") hide();
    }}
  >
    {open && (
      <>
        {header}
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            role="menuitem"
            tabIndex={-1}
            className={["menu__item", itemClassName].filter(Boolean).join(" ")}
            style={itemStyle}
            disabled={item.disabled}
            onClick={() => {
              item.onClick();
              hide(true);
            }}
          >
            {item.label}
          </button>
        ))}
      </>
    )}
  </div>
);
