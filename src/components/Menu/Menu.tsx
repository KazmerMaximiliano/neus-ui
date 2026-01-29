import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import "./Menu.styles.css";
import { MenuProps } from "./Menu.types";

export const Menu = ({ icon: Icon, text, items }: MenuProps) => {
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

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="menu" ref={menuRef}>
      {Icon ? (
        <IconButton icon={Icon} variant="text" onClick={handleToggle} />
      ) : (
        <Button
          label={text || ""}
          variant="text"
          onClick={handleToggle}
        />
      )}
      {openMenu && (
        <div className="menu-dropdown">
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
