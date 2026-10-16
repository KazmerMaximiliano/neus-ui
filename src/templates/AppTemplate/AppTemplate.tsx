import { Sidebar } from "../../components";
import "./AppTemplate.styles.css";
import type { AppTemplateProps } from "./AppTemplate.types";

const APP_NAME = import.meta.env.VITE_APP_NAME || "NEUS UI";

/** Application shell; Sidebar owns its responsive navigation and modal state. */
export const AppTemplate = ({ children, routes, menu, title = APP_NAME, className, style, headerStyle, sidebarStyle, contentStyle, contentContainerStyle }: AppTemplateProps) => (
  <div className={["app-template", className].filter(Boolean).join(" ")} style={style}>
    <header className="app-template__header" style={headerStyle}>{menu}</header>
    <div className="app-template__sidebar">
      <Sidebar title={title} items={routes} sidebarStyle={sidebarStyle} />
    </div>
    <main className="app-template__content" style={contentStyle}>
      <div className="app-template__content-container" style={contentContainerStyle}>{children}</div>
    </main>
  </div>
);
