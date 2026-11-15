import type { CSSProperties, ElementType, ReactNode } from "react";
import type { SidebarItem } from "../../components/Sidebar";

export type AppTemplateProps = {
  readonly sidebarClassName?: string;
  readonly contentClassName?: string;
  readonly contentContainerClassName?: string;
  readonly headerClassName?: string;
  readonly sidebarContainerClassName?: string;
  readonly sidebarContainerStyle?: CSSProperties;
  readonly children: ReactNode;
  readonly routes: readonly SidebarItem[];
  /** Router link component for routes with href, passed to Sidebar. */
  readonly linkComponent?: ElementType;
  /** Global actions at the end of the header: user menu, notifications, the primary action. */
  readonly menu?: ReactNode;
  /** Context at the start of the header: breadcrumb, workspace switcher or search. */
  readonly headerStart?: ReactNode;
  readonly headerStartClassName?: string;
  readonly headerStartStyle?: CSSProperties;
  readonly title?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly sidebarStyle?: CSSProperties;
  readonly contentStyle?: CSSProperties;
  readonly contentContainerStyle?: CSSProperties;
};
