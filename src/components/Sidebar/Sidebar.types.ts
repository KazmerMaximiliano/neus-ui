import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SidebarItem = {
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};

export type SidebarProps = {
  items: SidebarItem[];
  title?: string;
};
