import { ChevronDown } from "lucide-react";
import { usePopover } from "../../hooks/usePopover";
import { MenuItems } from "../Menu/components/MenuItems";
import "../Menu/Menu.styles.css";
import "./Dropdown.styles.css";
import { DropdownProps } from "./Dropdown.types";

export const Dropdown = ({
  itemClassName,
  menuClassName,
  avatarClassName,
  avatarIconClassName,
  avatarIconStyle,
  avatarStyle,
  caretClassName,
  caretStyle,
  className,
  nameClassName,
  nameStyle,
  style,
  triggerClassName,
  icon: Icon,
  name,
  items,
  triggerStyle,
  menuStyle,
  itemStyle,
}: DropdownProps) => {
  const popover = usePopover({
    initialFocus: "[role=\"menuitem\"]:not(:disabled)",
  });
  const { id, open, triggerRef, toggle } = popover;
  const label = name || "Menú";

  return (
    <div
      className={["dropdown", className].filter(Boolean).join(" ")}
      style={style}
    >
      <button
        ref={triggerRef}
        type="button"
        className={[
          `dropdown__trigger${open ? " dropdown__trigger--open" : ""}`,
          triggerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={triggerStyle}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
      >
        <span
          className={["dropdown__avatar", avatarClassName]
            .filter(Boolean)
            .join(" ")}
          style={avatarStyle}
          aria-hidden
        >
          {Icon ? (
            <Icon
              className={["dropdown__avatar-icon", avatarIconClassName]
                .filter(Boolean)
                .join(" ")}
              style={avatarIconStyle}
            />
          ) : (
            label[0]
          )}
        </span>
        <ChevronDown
          className={["dropdown__caret", caretClassName]
            .filter(Boolean)
            .join(" ")}
          style={caretStyle}
          aria-hidden
        />
      </button>
      <MenuItems
        menuClassName={menuClassName}
        itemClassName={itemClassName}
        popover={popover}
        label={label}
        items={items}
        menuStyle={menuStyle}
        itemStyle={itemStyle}
        header={
          name && (
            <div
              className={["dropdown__name", nameClassName]
                .filter(Boolean)
                .join(" ")}
              style={nameStyle}
              role="none"
            >
              {name}
            </div>
          )
        }
      />
    </div>
  );
};
