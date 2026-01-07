import { SidebarItem } from "../../components/Sidebar/Sidebar.types";
export type AppTemplateProps = {
    children: React.ReactNode;
    routes: SidebarItem[];
    menu?: React.ReactNode;
};
