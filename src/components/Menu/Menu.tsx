import { usePopover } from "../../hooks/usePopover";
import "../Button/Button.styles.css";
import { getButtonClasses } from "../Button/Button.utils";
import "../IconButton/IconButton.styles.css";
import { getIconButtonClasses } from "../IconButton/IconButton.utils";
import "./Menu.styles.css";
import { MenuProps } from "./Menu.types";
import { MenuItems } from "./components/MenuItems";

export const Menu = ({
  icon: Icon,
  text,
  size = "medium",
  items,
  menuStyle,
  itemStyle,
}: MenuProps) => {
  const popover = usePopover({
    initialFocus: '[role="menuitem"]:not(:disabled)',
  });
  const { id, open, triggerRef, toggle } = popover;
  const name = text || "Menú";

  return (
    <div className="menu">
      <button
        ref={triggerRef}
        type="button"
        className={
          Icon
            ? getIconButtonClasses("text", "primary", size)
            : getButtonClasses("text", "primary", size, false)
        }
        aria-label={Icon ? name : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        {Icon ? (
          <Icon className="icon-button-icon" aria-hidden />
        ) : (
          <span className="button-label">{name}</span>
        )}
      </button>
      <MenuItems
        popover={popover}
        label={name}
        items={items}
        menuStyle={menuStyle}
        itemStyle={itemStyle}
      />
    </div>
  );
};
