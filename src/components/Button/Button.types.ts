import type { CSSProperties, ElementType, HTMLAttributeAnchorTarget, MouseEvent } from "react";
import type { DesignSystemId } from "../../design-systems";

type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "outlined" | "text" | "solid" | "secondary" | "tonal" | "elevated";
export type ButtonColor = "primary" | "success" | "error" | "info" | "white";
type ButtonSize = "small" | "medium" | "large";

type ButtonBaseProps = {
  readonly className?: string;
  readonly labelClassName?: string;
  readonly loaderClassName?: string;
  readonly label: string;
  readonly variant?: ButtonVariant;
  readonly color?: ButtonColor;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly loading?: boolean;
  readonly buttonStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly loaderStyle?: CSSProperties;
};

/** Renders a `<button>` that runs an action. */
export type ButtonActionProps = ButtonBaseProps & {
  readonly href?: undefined;
  readonly type?: ButtonType;
  readonly linkComponent?: never;
  readonly target?: never;
  readonly rel?: never;
  readonly onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

/** Renders a link with the button's look; `linkComponent` takes a router link such as Next.js `Link`. */
export type ButtonLinkProps = ButtonBaseProps & {
  readonly href: string;
  readonly type?: never;
  readonly linkComponent?: ElementType;
  readonly target?: HTMLAttributeAnchorTarget;
  readonly rel?: string;
  readonly onClick?: (e?: MouseEvent<HTMLAnchorElement>) => void;
};

export type ButtonProps = ButtonActionProps | ButtonLinkProps;

/** Storybook controls: one flat shape, split into the action or link props at render. */
export type ButtonStoryArgs = ButtonBaseProps & {
  readonly type?: ButtonType;
  readonly href?: string;
  readonly target?: HTMLAttributeAnchorTarget;
  readonly rel?: string;
  readonly linkComponent?: ElementType;
  readonly onClick?: (e?: MouseEvent<HTMLElement>) => void;
  readonly designSystem: DesignSystemId;
};
