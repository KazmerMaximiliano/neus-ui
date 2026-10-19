import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingLevel } from "../../components/Heading/Heading.types";
import type { SectionProps } from "../../components/Section/Section.types";

export type CallToActionProps = Omit<SectionProps, "title" | "children" | "as" | "container" | "contentClassName" | "contentStyle"> & {
  title: ReactNode;
  text?: ReactNode;
  actions?: ReactNode;
  /** A form or a summary beside the text, for example the signup form. */
  aside?: ReactNode;
  /** band centers the text and actions; split puts the aside beside them. */
  variant?: "band" | "split";
  titleAs?: HeadingLevel;
  bodyClassName?: string;
  bodyStyle?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  textClassName?: string;
  textStyle?: CSSProperties;
  actionsClassName?: string;
  actionsStyle?: CSSProperties;
  asideClassName?: string;
  asideStyle?: CSSProperties;
};

export type CallToActionStoryArgs = CallToActionProps & { designSystem: DesignSystemId };
