import { IconType } from "react-icons";

type ButtonSize = 'small' | 'medium' | 'large';

export type MenuItem = {
  label: string;
  onClick: () => void;
};

export type MenuProps = {
  icon?: IconType;
  text?: string;
  size?: ButtonSize;
  items: MenuItem[];
};
