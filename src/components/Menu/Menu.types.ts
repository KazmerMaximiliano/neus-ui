import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import { usePopover } from "../../hooks/usePopover";
import type { IconButtonIcon } from "../IconButton";

type MenuSize = "small" | "medium" | "large";

export type MenuItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type MenuProps = {
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
  popover: ReturnType<typeof usePopover<HTMLButtonElement, HTMLDivElement>>;
  label: string;
  items: MenuItem[];
  header?: ReactNode;
  menuStyle?: CSSProperties;
  itemStyle?: CSSProperties;
};