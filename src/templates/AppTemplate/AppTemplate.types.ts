import type { CSSProperties, ReactNode } from "react";
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
  menu?: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  sidebarStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  contentContainerStyle?: CSSProperties;
};
