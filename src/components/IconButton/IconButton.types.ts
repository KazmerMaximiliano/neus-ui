import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'outlined' | 'text' | 'solid';
type ButtonColor = 'primary' | 'success' | 'error' | 'info';
type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};
