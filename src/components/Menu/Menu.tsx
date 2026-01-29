import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import "./Menu.styles.css";
import { MenuProps } from "./Menu.types";

export const Menu = ({
  icon: Icon,
  text,
  size = "medium",
  items,
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.right,
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", () => setOpenMenu(false), true);
      window.addEventListener("resize", () => setOpenMenu(false));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", () => setOpenMenu(false), true);
      window.removeEventListener("resize", () => setOpenMenu(false));
    };
  }, [openMenu]);

  const handleToggle = () => {
    if (!openMenu) {
      updatePosition();
    }
    setOpenMenu(!openMenu);
  };

  return (
    <div className="menu" ref={triggerRef}>
      {Icon ? (
        <IconButton
          icon={Icon}
          variant="text"
          onClick={handleToggle}
          size={size}
        />
      ) : (
        <Button label={text || ""} variant="text" onClick={handleToggle} />
      )}
      {openMenu &&
        createPortal(
          <div
            className="menu-dropdown"
            ref={menuRef}
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="menu-item clickable"
                onClick={() => {
                  item.onClick();
                  setOpenMenu(false);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
