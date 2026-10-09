import type { CSSProperties, MouseEvent } from "react";
import type { DesignSystemId } from "../../design-systems";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "outlined" | "text" | "solid";
export type ButtonColor = "primary" | "success" | "error" | "info" | "white";
type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = {
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

/** Preview controls for the single Button story; not additional component props. */
export type ButtonStoryArgs = ButtonProps & {
  /** Design system to preview; defaults to Neus UI in Storybook. */
  designSystem: DesignSystemId;
};
