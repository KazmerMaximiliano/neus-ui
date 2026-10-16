import type { CSSProperties, MouseEvent } from "react";
import type { DesignSystemId } from "../../design-systems";

type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "outlined" | "text" | "solid" | "secondary" | "tonal" | "elevated";
export type ButtonColor = "primary" | "success" | "error" | "info" | "white";
type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
  className?: string;
  labelClassName?: string;
  loaderClassName?: string;
  label: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  buttonStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  loaderStyle?: CSSProperties;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

export type ButtonStoryArgs = ButtonProps & {
  designSystem: DesignSystemId;
};
