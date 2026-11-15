import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { HeadingLevel } from "../../components/Heading";
import type { SectionProps } from "../../components/Section";

export type CallToActionProps = Omit<SectionProps, "title" | "children" | "as" | "container" | "contentClassName" | "contentStyle"> & {
  readonly title: ReactNode;
  readonly text?: ReactNode;
  readonly actions?: ReactNode;
  /** A form or a summary beside the text, for example the signup form. */
  readonly aside?: ReactNode;
  /** band centers the text and actions; split puts the aside beside them. */
  readonly variant?: "band" | "split";
  readonly titleAs?: HeadingLevel;
  readonly bodyClassName?: string;
  readonly bodyStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly textClassName?: string;
  readonly textStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
  readonly asideClassName?: string;
  readonly asideStyle?: CSSProperties;
};

export type CallToActionStoryArgs = CallToActionProps & { readonly designSystem: DesignSystemId };
