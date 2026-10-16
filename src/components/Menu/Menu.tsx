import { usePopover } from "../../hooks/usePopover";
import { MenuItems } from "./components/MenuItems";
import "../Button/Button.styles.css";
import "../IconButton/IconButton.styles.css";
import "./Menu.styles.css";
import { MenuProps } from "./Menu.types";
import { getButtonClasses } from "../Button/Button.utils";
import { getIconButtonClasses } from "../IconButton/IconButton.utils";

export const Menu = ({
  itemClassName,
  menuClassName,
  buttonLabelClassName,
  buttonLabelStyle,
  className,
  iconButtonIconClassName,
  iconButtonIconStyle,
  style,
  triggerClassName,
  triggerStyle,
  icon: Icon,
  text,
  size = "medium",
  items,
  menuStyle,
  itemStyle,
}: MenuProps) => {
  const popover = usePopover({
    initialFocus: "[role=\"menuitem\"]:not(:disabled)",
  });
  const { id, open, triggerRef, toggle } = popover;
  const name = text || "Menú";

  return (
    <div className={["menu", className].filter(Boolean).join(" ")} style={style}>
      <button
        ref={triggerRef}
        type="button"
        className={[Icon
          ? getIconButtonClasses("text", "primary", size)
          : getButtonClasses("text", "primary", size, false), triggerClassName].filter(Boolean).join(" ")}
        style={triggerStyle}
        aria-label={Icon ? name : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        {Icon ? (
          <Icon
            className={["icon-button-icon", iconButtonIconClassName].filter(Boolean).join(" ")}
            style={iconButtonIconStyle}
            aria-hidden
          />
        ) : (
          <span
            className={["button-label", buttonLabelClassName].filter(Boolean).join(" ")}
            style={buttonLabelStyle}
          >{name}</span>
        )}
      </button>
      <MenuItems
        menuClassName={menuClassName}
        itemClassName={itemClassName}
        popover={popover}
        label={name}
        items={items}
        menuStyle={menuStyle}
        itemStyle={itemStyle}
      />
    </div>
  );
};
