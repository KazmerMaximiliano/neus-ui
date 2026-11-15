import type { LucideProps } from "lucide-react";
import type { CSSProperties, ElementType, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SidebarItem = {
  readonly label: string;
  readonly icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  /** Destination; the item renders a link (Cmd/Ctrl+click and "open in new tab" work) instead of a button. */
  readonly href?: string;
  readonly onClick?: () => void;
  readonly active?: boolean;
  readonly visible?: boolean;
};

export type SidebarLabels = {
  readonly navigation?: string;
  readonly open?: string;
  readonly close?: string;
  readonly expand?: string;
  readonly collapse?: string;
};

export type SidebarProps = {
  readonly closeIconClassName?: string;
  readonly closeIconStyle?: CSSProperties;
  readonly toggleIconClassName?: string;
  readonly toggleIconStyle?: CSSProperties;
  readonly avatarClassName?: string;
  readonly avatarStyle?: CSSProperties;
  readonly bodyClassName?: string;
  readonly closeButtonClassName?: string;
  readonly dialogClassName?: string;
  readonly dialogStyle?: CSSProperties;
  readonly headerClassName?: string;
  readonly headerInnerClassName?: string;
  readonly headerInnerStyle?: CSSProperties;
  readonly iconClassName?: string;
  readonly itemClassName?: string;
  readonly labelClassName?: string;
  readonly panelClassName?: string;
  readonly panelStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly toggleClassName?: string;
  readonly items: readonly SidebarItem[];
  /** Router link component (for example Next.js Link) rendered for items with href instead of <a>. */
  readonly linkComponent?: ElementType;
  readonly title?: string;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly labels?: SidebarLabels;
  readonly sidebarStyle?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly titleStyle?: CSSProperties;
  readonly bodyStyle?: CSSProperties;
  readonly itemStyle?: CSSProperties;
  readonly iconStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly toggleStyle?: CSSProperties;
  readonly closeButtonStyle?: CSSProperties;
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
  readonly designSystem: DesignSystemId;
  readonly background: "theme" | "solid" | "gradient" | "image";
};
