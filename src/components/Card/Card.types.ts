export type CardProps = {
  avatarImage?: string;
  avatarAlt?: string;
  header?: CardHeaderProps;
  content?: React.ReactNode;
  fill?: boolean;
  color?: CardColor;
};

export type CardHeaderProps = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export type CardColor = "purple" | "pink" | "red" | "yellow" | "blue" | "green";