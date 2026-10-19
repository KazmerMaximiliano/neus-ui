import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { SiteLink } from "../SiteHeader/SiteHeader.types";

export type SiteFooterColumn = { title: string; links: Omit<SiteLink, "active">[] };

export type SiteFooterProps = Omit<ComponentPropsWithRef<"footer">, "children"> & {
  /** Logo or name, with a line about the business if it helps. */
  brand?: ReactNode;
  /** Columns of links, each a labelled navigation landmark. */
  columns?: SiteFooterColumn[];
  /** Copyright, address, legal links. */
  legal?: ReactNode;
  /** Router link component (for example Next.js Link) rendered instead of <a>. */
  linkComponent?: ElementType;
  innerClassName?: string;
  innerStyle?: CSSProperties;
  brandClassName?: string;
  brandStyle?: CSSProperties;
  columnClassName?: string;
  columnStyle?: CSSProperties;
  columnTitleClassName?: string;
  columnTitleStyle?: CSSProperties;
  linkClassName?: string;
  linkStyle?: CSSProperties;
  legalClassName?: string;
  legalStyle?: CSSProperties;
};

export type SiteFooterStoryArgs = SiteFooterProps & { designSystem: DesignSystemId };
