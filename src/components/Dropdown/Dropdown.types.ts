import { IconType } from "react-icons";

export type DropdownItem = {
  label: string;
  onClick: () => void;
};

export type DropdownProps = {
  icon?: IconType;
  name?: string;
  items: DropdownItem[];
};
