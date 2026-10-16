import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type BadgeVariant = "solid" | "dot";
export type BadgeColor = "primary" | "success" | "error" | "info" | "neutral";

export type BadgeProps = {
  className?: string;
  dotClassName?: string;
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  badgeStyle?: CSSProperties;
  dotStyle?: CSSProperties;
};

export type BadgeStoryArgs = BadgeProps & {
  designSystem: DesignSystemId;
};
