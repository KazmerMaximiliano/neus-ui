import { focusMenuItem } from "../../../hooks/usePopover";
import type { MenuItemsProps } from "../Menu.types";

export const MenuItems = ({
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
    className="menu__panel"
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
            className="menu__item"
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
