import { Sidebar } from "../../components";
import "./AppTemplate.styles.css";
import type { AppTemplateProps } from "./AppTemplate.types";

const APP_NAME = import.meta.env.VITE_APP_NAME || "NEUS UI";

/** Application shell; Sidebar owns its responsive navigation and modal state. */
export const AppTemplate = ({ children, routes, menu }: AppTemplateProps) => (
  <div className="app-template">
    <div className="app-template__header">{menu}</div>
    <div className="app-template__sidebar">
      <Sidebar title={APP_NAME} items={routes} />
    </div>
    <div className="app-template__content">
      <div className="app-template__content-container">{children}</div>
    </div>
  </div>
);
