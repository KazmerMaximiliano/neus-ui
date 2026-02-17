export type CardProps = {
    children?: React.ReactNode;
    avatarImage?: string;
    avatarAlt?: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    fill?: boolean;
    color?: CardColor;
};
export type CardColor = "purple" | "pink" | "red" | "yellow" | "blue" | "green";
