import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { HeadingLevel } from "../../components/Heading";
import type { DesignSystemId } from "../../design-systems";

export type SectionHeaderProps = Omit<ComponentPropsWithRef<"div">, "title" | "children"> & {
  readonly title: ReactNode;
  /** Short label above the title, when the system's DESIGN.md allows overlines. */
  readonly eyebrow?: ReactNode;
  readonly description?: ReactNode;
  /** A link or button beside the title, such as "See every speaker". */
  readonly actions?: ReactNode;
  readonly align?: "start" | "center";
  readonly titleAs?: HeadingLevel;
  /** id of the heading, for aria-labelledby on the enclosing Section. */
  readonly titleId?: string;
  readonly eyebrowClassName?: string;
  readonly eyebrowStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
};

export type SectionHeaderStoryArgs = SectionHeaderProps & { readonly designSystem: DesignSystemId };
