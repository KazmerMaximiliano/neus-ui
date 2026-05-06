type BadgeVariant = "solid" | "dot";
export type BadgeColor = "primary" | "success" | "error" | "info" | "neutral";

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
};
