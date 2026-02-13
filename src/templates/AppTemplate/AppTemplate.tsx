import { useState } from "react";

import { Menu } from "lucide-react";
import { IconButton, Sidebar } from "../../components";
import "./AppTemplate.styles.css";
import { AppTemplateProps } from "./AppTemplate.types";

const appName = import.meta.env.VITE_APP_NAME || "NEUS UI";

export const AppTemplate = ({ children, routes, menu }: AppTemplateProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app-template">
      <div className="header-container">
        <IconButton icon={Menu} onClick={() => setShowSidebar(!showSidebar)} />
        {menu}
      </div>

      <div
        className={`sidebar-container ${
          showSidebar ? "sidebar-container--active" : ""
        }`}
      >
        <Sidebar title={appName} items={routes} />
      </div>

      <div className="content">
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};
