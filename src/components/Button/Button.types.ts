import type { CSSProperties, ElementType, HTMLAttributeAnchorTarget, MouseEvent } from "react";
import type { DesignSystemId } from "../../design-systems";

type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "outlined" | "text" | "solid" | "secondary" | "tonal" | "elevated";
export type ButtonColor = "primary" | "success" | "error" | "info" | "white";
type ButtonSize = "small" | "medium" | "large";

type ButtonBaseProps = {
  className?: string;
  labelClassName?: string;
  loaderClassName?: string;
  label: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  buttonStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  loaderStyle?: CSSProperties;
};

/** Renders a `<button>` that runs an action. */
export type ButtonActionProps = ButtonBaseProps & {
  href?: undefined;
  type?: ButtonType;
  linkComponent?: never;
  target?: never;
  rel?: never;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

/** Renders a link with the button's look; `linkComponent` takes a router link such as Next.js `Link`. */
export type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  type?: never;
  linkComponent?: ElementType;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: (e?: MouseEvent<HTMLAnchorElement>) => void;
};

export type ButtonProps = ButtonActionProps | ButtonLinkProps;

/** Storybook controls: one flat shape, split into the action or link props at render. */
export type ButtonStoryArgs = ButtonBaseProps & {
  type?: ButtonType;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  linkComponent?: ElementType;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  designSystem: DesignSystemId;
};
