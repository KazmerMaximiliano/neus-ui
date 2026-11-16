import type { LucideProps } from "lucide-react";
import type {
  ComponentPropsWithRef,
  CSSProperties,
  ForwardRefExoticComponent,
  MouseEvent,
  RefAttributes,
} from "react";
import type { DesignSystemId } from "../../design-systems";

type IconButtonType = "button" | "submit" | "reset";
type IconButtonVariant = "outlined" | "text" | "solid";
export type IconButtonColor = "primary" | "success" | "error" | "info";
type IconButtonSize = "small" | "medium" | "large";

export type IconButtonIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

type IconButtonOwnProps = {
  readonly className?: string;
  readonly iconClassName?: string;
  readonly loaderClassName?: string;
  readonly icon: IconButtonIcon;
  readonly label: string;
  readonly type?: IconButtonType;
  readonly variant?: IconButtonVariant;
  readonly color?: IconButtonColor;
  readonly size?: IconButtonSize;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly buttonStyle?: CSSProperties;
  readonly iconStyle?: CSSProperties;
  readonly loaderStyle?: CSSProperties;
  readonly onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

/** Native `<button>` attributes (aria-*, data-*, form, name…) and its ref; the label is its name. */
type IconButtonNativeProps = Omit<
  ComponentPropsWithRef<"button">,
  keyof IconButtonOwnProps | "style" | "children" | "aria-label" | "dangerouslySetInnerHTML"
>;

export type IconButtonProps = IconButtonOwnProps & IconButtonNativeProps;

export type IconButtonStoryArgs = IconButtonProps & {
  readonly designSystem: DesignSystemId;
};
