import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type SiteLink = {
  readonly label: string;
  readonly href: string;
  /** The current page; adds aria-current="page". */
  readonly active?: boolean;
};

export type SiteHeaderLabels = {
  /** Accessible name of the navigation landmark. */
  readonly navigation?: string;
  /** Accessible name of the phone menu button. */
  readonly menu?: string;
  /** Text of the skip link. */
  readonly skipLink?: string;
};

export type SiteHeaderProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  /** Logo or name, linked to brandHref. */
  readonly brand: ReactNode;
  readonly brandHref?: string;
  readonly links?: readonly SiteLink[];
  /** Buttons at the end, such as the primary call to action. */
  readonly actions?: ReactNode;
  /** sticky keeps the header at the top while the page scrolls. */
  readonly variant?: "plain" | "sticky";
  /** Renders a skip link to this target (for example "#main"), visible on focus. */
  readonly skipLinkTarget?: string;
  readonly labels?: SiteHeaderLabels;
  /** Router link component (for example Next.js Link) rendered instead of <a>. */
  readonly linkComponent?: ElementType;
  readonly innerClassName?: string;
  readonly innerStyle?: CSSProperties;
  readonly brandClassName?: string;
  readonly brandStyle?: CSSProperties;
  readonly menuClassName?: string;
  readonly menuStyle?: CSSProperties;
  readonly linkClassName?: string;
  readonly linkStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
  readonly menuButtonClassName?: string;
  readonly menuButtonStyle?: CSSProperties;
  readonly skipLinkClassName?: string;
  readonly skipLinkStyle?: CSSProperties;
};

export type SiteHeaderStoryArgs = SiteHeaderProps & { readonly designSystem: DesignSystemId };
