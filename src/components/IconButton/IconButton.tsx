import { BeatLoader } from "react-spinners";
import "./IconButton.styles.css";
import { IconButtonProps } from "./IconButton.types";
import { getIconButtonClasses } from "./IconButton.utils";

export const IconButton = ({
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
    className={getIconButtonClasses(variant, color, size)}
    style={buttonStyle}
    onClick={(e) => onClick?.(e)}
    type={type}
    disabled={disabled || loading}
    aria-label={label}
    aria-busy={loading || undefined}
  >
    {loading ? (
      <BeatLoader
        className="icon-button-loader"
        size="0.3em"
        margin="0.08em"
        color="currentColor"
        speedMultiplier={0.5}
        style={loaderStyle}
      />
    ) : (
      <Icon className="icon-button-icon" style={iconStyle} aria-hidden />
    )}
  </button>
);
