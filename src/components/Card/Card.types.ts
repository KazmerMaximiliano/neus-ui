export type CardColor = "purple" | "pink" | "red" | "yellow" | "blue" | "green";

export type CardVariant = "default" | "glass";

export type CardProps = {
  children?: React.ReactNode;

  // default variant props
  variant?: CardVariant;
  avatarImage?: string;
  avatarAlt?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fill?: boolean;
  color?: CardColor;

  // optional content slots
  icon?: React.ReactNode;
  title?: string;
  description?: string;

  // behavioral modifiers (style only — no layout change)
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
