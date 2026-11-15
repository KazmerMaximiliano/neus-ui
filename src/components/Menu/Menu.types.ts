import type { CSSProperties, ReactNode } from "react";
import type { usePopover } from "../../hooks/usePopover";
import type { DesignSystemId } from "../../design-systems";
import type { IconButtonIcon } from "../IconButton";

type MenuSize = "small" | "medium" | "large";

export type MenuItem = {
  readonly label: string;
  readonly onClick: () => void;
  readonly disabled?: boolean;
};

export type MenuProps = {
  readonly buttonLabelClassName?: string;
  readonly buttonLabelStyle?: CSSProperties;
  readonly className?: string;
  readonly iconButtonIconClassName?: string;
  readonly iconButtonIconStyle?: CSSProperties;
  readonly itemClassName?: string;
  readonly menuClassName?: string;
  readonly style?: CSSProperties;
  readonly triggerClassName?: string;
  readonly triggerStyle?: CSSProperties;
  readonly icon?: IconButtonIcon;
  readonly text?: string;
  readonly size?: MenuSize;
  readonly items: readonly MenuItem[];
  readonly menuStyle?: CSSProperties;
  readonly itemStyle?: CSSProperties;
};

export type MenuStoryArgs = MenuProps & {
  readonly designSystem: DesignSystemId;
};

export type MenuItemsProps = {
  readonly itemClassName?: string;
  readonly menuClassName?: string;
  readonly popover: ReturnType<typeof usePopover<HTMLButtonElement, HTMLDivElement>>;
  readonly label: string;
  readonly items: readonly MenuItem[];
  readonly header?: ReactNode;
  readonly menuStyle?: CSSProperties;
  readonly itemStyle?: CSSProperties;
};