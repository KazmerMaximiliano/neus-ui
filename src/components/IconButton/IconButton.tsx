import { Spinner } from "../Spinner";
import "./IconButton.styles.css";
import type { IconButtonProps } from "./IconButton.types";
import { getIconButtonClasses } from "./IconButton.utils";

export const IconButton = ({
  className,
  iconClassName,
  loaderClassName,
  icon: Icon,
  label,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  buttonStyle,
  iconStyle,
  loaderStyle,
  onClick,
}: IconButtonProps) => (
  <button
    className={[getIconButtonClasses(variant, color, size), className]
      .filter(Boolean)
      .join(" ")}
    style={buttonStyle}
    onClick={(e) => onClick?.(e)}
    type={type}
    disabled={disabled || loading}
    aria-label={label}
    aria-busy={loading || undefined}
  >
    {loading ? (
      <Spinner
        variant="dots"
        className={["icon-button-loader", loaderClassName]
          .filter(Boolean)
          .join(" ")}
        style={loaderStyle}
      />
    ) : (
      <Icon
        className={["icon-button-icon", iconClassName]
          .filter(Boolean)
          .join(" ")}
        style={iconStyle}
        aria-hidden
      />
    )}
  </button>
);
