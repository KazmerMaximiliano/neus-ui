import type { SidebarItem } from "../../components/Sidebar";

export type AppTemplateProps = {
  children: React.ReactNode;
  routes: SidebarItem[];
  menu?: React.ReactNode;
};