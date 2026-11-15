import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type BadgeVariant = "solid" | "dot";
export type BadgeColor = "primary" | "success" | "error" | "info" | "neutral";

export type BadgeProps = {
  readonly className?: string;
  readonly dotClassName?: string;
  readonly label: string;
  readonly variant?: BadgeVariant;
  readonly color?: BadgeColor;
  readonly badgeStyle?: CSSProperties;
  readonly dotStyle?: CSSProperties;
};

export type BadgeStoryArgs = BadgeProps & {
  readonly designSystem: DesignSystemId;
};
