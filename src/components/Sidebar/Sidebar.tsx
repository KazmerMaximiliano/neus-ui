import { useState } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import "./Sidebar.styles.css";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar = ({ title, items }: SidebarProps) => {
  const { isTablet } = useResponsive();

  const [showFullTitle, setShowFullTitle] = useState(false);

  return (
    <div
      className="sidebar"
      onMouseEnter={isTablet ? () => setShowFullTitle(true) : undefined}
      onMouseLeave={isTablet ? () => setShowFullTitle(false) : undefined}
    >
      <div className="sidebar__header">
        <div className="sidebar__header-inner">
          <div className="sidebar__title">
            {!isTablet || showFullTitle ? title : title?.charAt(0)}
          </div>
        </div>
      </div>
      <div className="sidebar__body">
        {items.map(
          (item, index) =>
            item.visible !== false && (
              <div
                key={index}
                className={`sidebar__button${item.active ? " sidebar__button--active" : ""}`}
                onClick={item.onClick}
              >
                {item.icon && (
                  <item.icon size={14} className="sidebar__button-icon" />
                )}
                <div className="sidebar__button-label">{item.label}</div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};
