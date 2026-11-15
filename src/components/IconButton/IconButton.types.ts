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

export type IconButtonStoryArgs = IconButtonProps & {
  readonly designSystem: DesignSystemId;
};
