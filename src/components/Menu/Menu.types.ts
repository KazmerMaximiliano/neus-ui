import type { CSSProperties, ReactNode } from "react";
import { usePopover } from "../../hooks/usePopover";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";

type MenuSize = "small" | "medium" | "large";

export type MenuItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type MenuProps = {
  buttonLabelClassName?: string;
  buttonLabelStyle?: CSSProperties;
  className?: string;
  iconButtonIconClassName?: string;
  iconButtonIconStyle?: CSSProperties;
  itemClassName?: string;
  menuClassName?: string;
  style?: CSSProperties;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  icon?: IconButtonIcon;
  text?: string;
  size?: MenuSize;
  items: MenuItem[];
  menuStyle?: CSSProperties;
  itemStyle?: CSSProperties;
};

export type MenuStoryArgs = MenuProps & {
  designSystem: DesignSystemId;
};

export type MenuItemsProps = {
  itemClassName?: string;
  menuClassName?: string;
  popover: ReturnType<typeof usePopover<HTMLButtonElement, HTMLDivElement>>;
  label: string;
  items: MenuItem[];
  header?: ReactNode;
  menuStyle?: CSSProperties;
  itemStyle?: CSSProperties;
};