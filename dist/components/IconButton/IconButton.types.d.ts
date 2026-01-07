import { IconType } from "react-icons";
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'outlined' | 'text' | 'solid';
type ButtonColor = 'primary' | 'success' | 'error' | 'info';
type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonProps = {
    icon: IconType;
    type?: ButtonType;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
};
export {};
