import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";


export type DropdownItem = {
  label: string;
  onClick: () => void;
};

export type DropdownProps = {
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  name?: string;
  items: DropdownItem[];
};
