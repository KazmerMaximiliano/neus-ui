import type { LucideProps } from "lucide-react";
import type {
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

export type IconButtonProps = {
  icon: IconButtonIcon;
  label: string;
  type?: IconButtonType;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  loaderStyle?: CSSProperties;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

export type IconButtonStoryArgs = IconButtonProps & {
  designSystem: DesignSystemId;
};
