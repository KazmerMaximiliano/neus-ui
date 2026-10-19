import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { HeadingLevel } from "../../../../components/Heading/Heading.types";

export type FeatureItemProps = {
  /** A lucide-react icon element; it sits on a tinted tile. */
  icon?: ReactNode;
  title: ReactNode;
  /** The explanation, one or two sentences. */
  children?: ReactNode;
  /** A link to more detail. */
  action?: ReactNode;
  titleAs?: HeadingLevel;
  className?: string;
  style?: CSSProperties;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  descriptionClassName?: string;
  descriptionStyle?: CSSProperties;
  actionClassName?: string;
  actionStyle?: CSSProperties;
};

export type FeatureItemStoryArgs = FeatureItemProps & {
  variant: "grid" | "list" | "cards";
  designSystem: DesignSystemId;
};
