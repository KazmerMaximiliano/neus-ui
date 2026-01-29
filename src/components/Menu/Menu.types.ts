import { IconType } from "react-icons";

export type MenuItem = {
  label: string;
  onClick: () => void;
};

export type MenuProps = {
  icon?: IconType;
  text?: string;
  items: MenuItem[];
};
