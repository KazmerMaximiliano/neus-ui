type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'outlined' | 'text' | 'solid';
export type ButtonColor = 'primary' | 'success' | 'error' | 'info';
type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
