import { useEffect, useRef, useState } from "react";
import "./Menu.styles.css";
import { MenuProps } from "./Menu.types";

export const Menu = ({ icon: Icon, name, items }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="menu" ref={menuRef} onClick={() => setOpenMenu(!openMenu)}>
      <div className="menu-avatar">{Icon ? <Icon /> : "X"}</div>
      <div className={`menu-caret ${openMenu ? "menu-caret--open" : ""}`} />
      {openMenu && (
        <div className="menu-dropdown">
          <div className="menu-item">
            <span className="menu-name">{name || ""}</span>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className="menu-item clickable"
              onClick={item.onClick}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
