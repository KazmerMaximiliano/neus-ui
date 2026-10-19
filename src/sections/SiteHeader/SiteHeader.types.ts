import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SiteLink = {
  label: string;
  href: string;
  /** The current page; adds aria-current="page". */
  active?: boolean;
};

export type SiteHeaderLabels = {
  /** Accessible name of the navigation landmark. */
  navigation?: string;
  /** Accessible name of the phone menu button. */
  menu?: string;
  /** Text of the skip link. */
  skipLink?: string;
};

export type SiteHeaderProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  /** Logo or name, linked to brandHref. */
  brand: ReactNode;
  brandHref?: string;
  links?: SiteLink[];
  /** Buttons at the end, such as the primary call to action. */
  actions?: ReactNode;
  /** sticky keeps the header at the top while the page scrolls. */
  variant?: "plain" | "sticky";
  /** Renders a skip link to this target (for example "#main"), visible on focus. */
  skipLinkTarget?: string;
  labels?: SiteHeaderLabels;
  /** Router link component (for example Next.js Link) rendered instead of <a>. */
  linkComponent?: ElementType;
  innerClassName?: string;
  innerStyle?: CSSProperties;
  brandClassName?: string;
  brandStyle?: CSSProperties;
  menuClassName?: string;
  menuStyle?: CSSProperties;
  linkClassName?: string;
  linkStyle?: CSSProperties;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
  menuButtonClassName?: string;
  menuButtonStyle?: CSSProperties;
  skipLinkClassName?: string;
  skipLinkStyle?: CSSProperties;
};

export type SiteHeaderStoryArgs = SiteHeaderProps & { designSystem: DesignSystemId };
