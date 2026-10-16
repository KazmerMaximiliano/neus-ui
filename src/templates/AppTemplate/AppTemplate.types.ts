import type { CSSProperties, ReactNode } from "react";
import type { SidebarItem } from "../../components/Sidebar";

export type AppTemplateProps = {
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
