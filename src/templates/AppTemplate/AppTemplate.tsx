import { useState } from "react";

import { Menu } from "lucide-react";
import { IconButton, Sidebar } from "../../components";
import "./AppTemplate.styles.css";
import { AppTemplateProps } from "./AppTemplate.types";

const appName = import.meta.env.VITE_APP_NAME || "NEUS UI";

export const AppTemplate = ({ children, routes, menu }: AppTemplateProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="app-template">
      <div className="app-template__header">
        <IconButton icon={Menu} onClick={() => setShowSidebar(!showSidebar)} />
        {menu}
      </div>

      {showSidebar && (
        <div className="app-template__overlay" onClick={handleCloseSidebar} />
      )}

      <div
        className={`app-template__sidebar${
          showSidebar ? " app-template__sidebar--active" : ""
        }`}
        onClick={handleCloseSidebar}
      >
        <Sidebar title={appName} items={routes} />
      </div>

      <div className="app-template__content">
        <div className="app-template__content-container">{children}</div>
      </div>
    </div>
  );
};
