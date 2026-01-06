type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'outlined' | 'text' | 'solid';
export type ButtonColor = 'primary' | 'success' | 'error' | 'info';

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
};
