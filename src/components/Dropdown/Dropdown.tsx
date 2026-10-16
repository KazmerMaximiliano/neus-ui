import { ChevronDown } from "lucide-react";
import { usePopover } from "../../hooks/usePopover";
import "../Menu/Menu.styles.css";
import { MenuItems } from "../Menu/components/MenuItems";
import "./Dropdown.styles.css";
import { DropdownProps } from "./Dropdown.types";

export const Dropdown = ({
  icon: Icon,
  name,
  items,
  triggerStyle,
  menuStyle,
  itemStyle,
}: DropdownProps) => {
  const popover = usePopover({
    initialFocus: '[role="menuitem"]:not(:disabled)',
  });
  const { id, open, triggerRef, toggle } = popover;
  const label = name || "Menú";

  return (
    <div className="dropdown">
      <button
        ref={triggerRef}
        type="button"
        className={`dropdown__trigger${open ? " dropdown__trigger--open" : ""}`}
        style={triggerStyle}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        <span className="dropdown__avatar" aria-hidden>
          {Icon ? <Icon className="dropdown__avatar-icon" /> : label[0]}
        </span>
        <ChevronDown className="dropdown__caret" aria-hidden />
      </button>
      <MenuItems
        popover={popover}
        label={label}
        items={items}
        menuStyle={menuStyle}
        itemStyle={itemStyle}
        header={
          name && (
            <div className="dropdown__name" role="none">
              {name}
            </div>
          )
        }
      />
    </div>
  );
};
