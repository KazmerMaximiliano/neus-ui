import { focusItem } from "../../../utils/focusItem";
import { PopoverPanel } from "../../Popover/components/PopoverPanel";
import type { MenuItemsProps } from "../Menu.types";
import { MENU_ITEM } from "../Menu.consts";

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
  <PopoverPanel
    ref={popoverRef}
    id={id}
    role="menu"
    aria-label={label}
    className={["menu__panel", menuClassName].filter(Boolean).join(" ")}
    style={menuStyle}
    onKeyDown={(event) => {
      if (focusItem(popoverRef.current, event.key, MENU_ITEM)) event.preventDefault();
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
  </PopoverPanel>
);
