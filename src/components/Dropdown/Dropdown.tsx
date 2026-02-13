import { useEffect, useRef, useState } from "react";
import "./Dropdown.styles.css";
import { DropdownProps } from "./Dropdown.types";

export const Dropdown = ({ icon: Icon, name, items }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="dropdown" ref={dropdownRef} onClick={() => setOpenDropdown(!openDropdown)}>
      <div className="dropdown-avatar">{Icon ? <Icon /> : "X"}</div>
      <div className={`dropdown-caret ${openDropdown ? "dropdown-caret--open" : ""}`} />
      <div className={`dropdown-panel ${openDropdown ? "dropdown-panel--open" : ""}`}>
        <div className="dropdown-item">
          <span className="dropdown-name">{name || ""}</span>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="dropdown-item clickable"
            onClick={item.onClick}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
