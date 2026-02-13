import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ButtonSize = 'small' | 'medium' | 'large';

export type MenuItem = {
  label: string;
  onClick: () => void;
};

export type MenuProps = {
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  text?: string;
  size?: ButtonSize;
  items: MenuItem[];
};
