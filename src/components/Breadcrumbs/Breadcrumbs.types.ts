import type { ComponentPropsWithRef, CSSProperties, ElementType } from "react";
import type { DesignSystemId } from "../../design-systems";

export type BreadcrumbsItem = {
  readonly label: string;
  /** Where the item leads; the last item is the current page and is never a link. */
  readonly href?: string;
};

export type BreadcrumbsLabels = {
  /** Accessible name of the navigation landmark. */
  readonly navigation?: string;
  /** Accessible name of the button that shows the collapsed items. */
  readonly expand?: string;
};

export type BreadcrumbsProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  /** From the top of the hierarchy down to the current page, which comes last. */
  readonly items: readonly BreadcrumbsItem[];
  /** Above this many items, the middle ones collapse behind a button that shows them. */
  readonly maxItems?: number;
  /** Router link component (for example Next.js Link) rendered instead of <a>. */
  readonly linkComponent?: ElementType;
  readonly labels?: BreadcrumbsLabels;
  readonly listClassName?: string;
  readonly listStyle?: CSSProperties;
  readonly itemClassName?: string;
  readonly itemStyle?: CSSProperties;
  readonly linkClassName?: string;
  readonly linkStyle?: CSSProperties;
  readonly currentClassName?: string;
  readonly currentStyle?: CSSProperties;
  readonly expandClassName?: string;
  readonly expandStyle?: CSSProperties;
};

export type BreadcrumbsStoryArgs = BreadcrumbsProps & {
  readonly designSystem: DesignSystemId;
};
