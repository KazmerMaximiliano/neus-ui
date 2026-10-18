import type { LucideProps } from "lucide-react";
import type { CSSProperties, ElementType, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SidebarItem = {
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  /** Destination; the item renders a link (Cmd/Ctrl+click and "open in new tab" work) instead of a button. */
  href?: string;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};

export type SidebarLabels = {
  navigation?: string;
  open?: string;
  close?: string;
  expand?: string;
  collapse?: string;
};

export type SidebarProps = {
  closeIconClassName?: string;
  closeIconStyle?: CSSProperties;
  toggleIconClassName?: string;
  toggleIconStyle?: CSSProperties;
  avatarClassName?: string;
  avatarStyle?: CSSProperties;
  bodyClassName?: string;
  closeButtonClassName?: string;
  dialogClassName?: string;
  dialogStyle?: CSSProperties;
  headerClassName?: string;
  headerInnerClassName?: string;
  headerInnerStyle?: CSSProperties;
  iconClassName?: string;
  itemClassName?: string;
  labelClassName?: string;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  titleClassName?: string;
  toggleClassName?: string;
  items: SidebarItem[];
  /** Router link component (for example Next.js Link) rendered for items with href instead of <a>. */
  linkComponent?: ElementType;
  title?: string;
  children?: ReactNode;
  className?: string;
  labels?: SidebarLabels;
  sidebarStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  toggleStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
};

export type SidebarViewport = "mobile" | "tablet" | "desktop";

export type SidebarState = {
  viewport: SidebarViewport;
  open: boolean;
  pinned: boolean;
  hovered: boolean;
  focused: boolean;
};

export type SidebarScrollLock = { count: number; hadClass: boolean };

export type SidebarStoryArgs = SidebarProps & {
  designSystem: DesignSystemId;
  background: "theme" | "solid" | "gradient" | "image";
};
