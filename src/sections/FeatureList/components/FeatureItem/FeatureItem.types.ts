import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";
import type { HeadingLevel } from "../../../../components/Heading";

export type FeatureItemProps = {
  /** A lucide-react icon element; it sits on a tinted tile. */
  readonly icon?: ReactNode;
  readonly title: ReactNode;
  /** The explanation, one or two sentences. */
  readonly children?: ReactNode;
  /** A link to more detail. */
  readonly action?: ReactNode;
  readonly titleAs?: HeadingLevel;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
  readonly actionClassName?: string;
  readonly actionStyle?: CSSProperties;
};

export type FeatureItemStoryArgs = FeatureItemProps & {
  readonly variant: "grid" | "list" | "cards";
  readonly designSystem: DesignSystemId;
};
