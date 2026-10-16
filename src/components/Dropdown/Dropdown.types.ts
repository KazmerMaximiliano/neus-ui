import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";
import type { MenuItem } from "../Menu";

export type DropdownItem = MenuItem;

export type DropdownProps = {
  icon?: IconButtonIcon;
  name?: string;
  items: DropdownItem[];
  triggerStyle?: CSSProperties;
  menuStyle?: CSSProperties;
  itemStyle?: CSSProperties;
};

export type DropdownStoryArgs = DropdownProps & {
  designSystem: DesignSystemId;
};
