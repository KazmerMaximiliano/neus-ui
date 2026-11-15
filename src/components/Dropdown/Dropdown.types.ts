import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";
import type { MenuItem } from "../Menu";

export type DropdownItem = MenuItem;

export type DropdownProps = {
  readonly itemClassName?: string;
  readonly menuClassName?: string;
  readonly avatarClassName?: string;
  readonly avatarIconClassName?: string;
  readonly avatarIconStyle?: CSSProperties;
  readonly avatarStyle?: CSSProperties;
  readonly caretClassName?: string;
  readonly caretStyle?: CSSProperties;
  readonly className?: string;
  readonly nameClassName?: string;
  readonly nameStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly triggerClassName?: string;
  readonly icon?: IconButtonIcon;
  readonly name?: string;
  readonly items: readonly DropdownItem[];
  readonly triggerStyle?: CSSProperties;
  readonly menuStyle?: CSSProperties;
  readonly itemStyle?: CSSProperties;
};

export type DropdownStoryArgs = DropdownProps & {
  readonly designSystem: DesignSystemId;
};
