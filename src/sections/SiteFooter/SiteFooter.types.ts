import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { SiteLink } from "../SiteHeader";

export type SiteFooterColumn = { readonly title: string; readonly links: readonly Omit<SiteLink, "active">[] };

export type SiteFooterProps = Omit<ComponentPropsWithRef<"footer">, "children"> & {
  /** Logo or name, with a line about the business if it helps. */
  readonly brand?: ReactNode;
  /** Columns of links, each a labelled navigation landmark. */
  readonly columns?: readonly SiteFooterColumn[];
  /** Copyright, address, legal links. */
  readonly legal?: ReactNode;
  /** Router link component (for example Next.js Link) rendered instead of <a>. */
  readonly linkComponent?: ElementType;
  readonly innerClassName?: string;
  readonly innerStyle?: CSSProperties;
  readonly brandClassName?: string;
  readonly brandStyle?: CSSProperties;
  readonly columnClassName?: string;
  readonly columnStyle?: CSSProperties;
  readonly columnTitleClassName?: string;
  readonly columnTitleStyle?: CSSProperties;
  readonly linkClassName?: string;
  readonly linkStyle?: CSSProperties;
  readonly legalClassName?: string;
  readonly legalStyle?: CSSProperties;
};

export type SiteFooterStoryArgs = SiteFooterProps & { readonly designSystem: DesignSystemId };
