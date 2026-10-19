import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingLevel } from "../../components/Heading/Heading.types";
import type { SectionProps } from "../../components/Section/Section.types";

export type HeroVariant = "split" | "centered" | "media-first";

export type HeroProps = Omit<SectionProps, "title" | "children" | "as" | "container" | "contentClassName" | "contentStyle"> & {
  title: ReactNode;
  /** Short label above the title, when the system's DESIGN.md allows overlines. */
  eyebrow?: ReactNode;
  lead?: ReactNode;
  /** The primary action, and at most one secondary one. */
  actions?: ReactNode;
  /** Microcopy under the actions: what happens next, what it asks of the user. */
  note?: ReactNode;
  /** The visual anchor: the real interface, a live demo, a picture or a MediaPlaceholder. */
  media?: ReactNode;
  /** split puts the media beside the text, centered below it, media-first above it. */
  variant?: HeroVariant;
  titleAs?: HeadingLevel;
  bodyClassName?: string;
  bodyStyle?: CSSProperties;
  eyebrowClassName?: string;
  eyebrowStyle?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  leadClassName?: string;
  leadStyle?: CSSProperties;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
  noteClassName?: string;
  noteStyle?: CSSProperties;
  mediaClassName?: string;
  mediaStyle?: CSSProperties;
};

export type HeroStoryArgs = HeroProps & { designSystem: DesignSystemId };
