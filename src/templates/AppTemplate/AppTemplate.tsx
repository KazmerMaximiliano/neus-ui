import { Sidebar } from "../../components";
import "./AppTemplate.styles.css";
import type { AppTemplateProps } from "./AppTemplate.types";
import { APP_NAME } from "./AppTemplate.consts";

export const AppTemplate = ({
  sidebarClassName,
  contentClassName,
  contentContainerClassName,
  headerClassName,
  sidebarContainerClassName,
  sidebarContainerStyle,
  children,
  routes,
  linkComponent,
  menu,
  title = APP_NAME,
  className,
  style,
  headerStyle,
  sidebarStyle,
  contentStyle,
  contentContainerStyle,
}: AppTemplateProps) => (
  <div
    className={["app-template", className].filter(Boolean).join(" ")}
    style={style}
  >
    <header
      className={["app-template__header", headerClassName]
        .filter(Boolean)
        .join(" ")}
      style={headerStyle}
    >
      {menu}
    </header>
    <div
      className={["app-template__sidebar", sidebarContainerClassName]
        .filter(Boolean)
        .join(" ")}
      style={sidebarContainerStyle}
    >
      <Sidebar
        className={sidebarClassName}
        title={title}
        items={routes}
        linkComponent={linkComponent}
        sidebarStyle={sidebarStyle}
      />
    </div>
    <main
      className={["app-template__content", contentClassName]
        .filter(Boolean)
        .join(" ")}
      style={contentStyle}
    >
      <div
        className={[
          "app-template__content-container",
          contentContainerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={contentContainerStyle}
      >
        {children}
      </div>
    </main>
  </div>
);
