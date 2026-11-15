import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingLevel } from "../../components/Heading";
import type { SectionProps } from "../../components/Section";

export type HeroVariant = "split" | "centered" | "media-first";

export type HeroProps = Omit<SectionProps, "title" | "children" | "as" | "container" | "contentClassName" | "contentStyle"> & {
  readonly title: ReactNode;
  /** Short label above the title, when the system's DESIGN.md allows overlines. */
  readonly eyebrow?: ReactNode;
  readonly lead?: ReactNode;
  /** The primary action, and at most one secondary one. */
  readonly actions?: ReactNode;
  /** Microcopy under the actions: what happens next, what it asks of the user. */
  readonly note?: ReactNode;
  /** The visual anchor: the real interface, a live demo, a picture or a MediaPlaceholder. */
  readonly media?: ReactNode;
  /** split puts the media beside the text, centered below it, media-first above it. */
  readonly variant?: HeroVariant;
  readonly titleAs?: HeadingLevel;
  readonly bodyClassName?: string;
  readonly bodyStyle?: CSSProperties;
  readonly eyebrowClassName?: string;
  readonly eyebrowStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly leadClassName?: string;
  readonly leadStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
  readonly noteClassName?: string;
  readonly noteStyle?: CSSProperties;
  readonly mediaClassName?: string;
  readonly mediaStyle?: CSSProperties;
};

export type HeroStoryArgs = HeroProps & { readonly designSystem: DesignSystemId };
