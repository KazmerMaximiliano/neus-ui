import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingLevel } from "../../components/Heading/Heading.types";

export type SectionHeaderProps = Omit<ComponentPropsWithRef<"div">, "title" | "children"> & {
  title: ReactNode;
  /** Short label above the title, when the system's DESIGN.md allows overlines. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** A link or button beside the title, such as "See every speaker". */
  actions?: ReactNode;
  align?: "start" | "center";
  titleAs?: HeadingLevel;
  /** id of the heading, for aria-labelledby on the enclosing Section. */
  titleId?: string;
  eyebrowClassName?: string;
  eyebrowStyle?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  descriptionClassName?: string;
  descriptionStyle?: CSSProperties;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
};

export type SectionHeaderStoryArgs = SectionHeaderProps & { designSystem: DesignSystemId };
