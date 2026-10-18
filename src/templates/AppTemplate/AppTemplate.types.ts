import type { CSSProperties, ElementType, ReactNode } from "react";
import type { SidebarItem } from "../../components/Sidebar";

export type AppTemplateProps = {
  sidebarClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  headerClassName?: string;
  sidebarContainerClassName?: string;
  sidebarContainerStyle?: CSSProperties;
  children: ReactNode;
  routes: SidebarItem[];
  /** Router link component for routes with href, passed to Sidebar. */
  linkComponent?: ElementType;
  menu?: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  sidebarStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  contentContainerStyle?: CSSProperties;
};
