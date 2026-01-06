import { useState } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import "./Sidebar.styles.css";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar = ({ title, items }: SidebarProps) => {
  const { isMobile } = useResponsive();

  const [showFullTitle, setShowFullTitle] = useState(false);

  return (
    <div
      className="sidebar"
      onMouseEnter={() => setShowFullTitle(true)}
      onMouseLeave={() => setShowFullTitle(false)}
    >
      <div className="sidebar-header">
        <div className="sidebar-header-fix">
          <div className="sidebar-title">
            {showFullTitle || isMobile ? title : title?.charAt(0)}
          </div>
        </div>
      </div>
      <div className="sidebar-body">
        {items.map(
          (item, index) =>
            item.visible !== false && (
              <div
                key={index}
                className={`sidebar-button ${item.active ? "active" : ""}`}
                onClick={item.onClick}
              >
                {item.icon && (
                  <item.icon size={14} className="sidebar-button-icon" />
                )}
                <div className="sidebar-button-label">{item.label}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
