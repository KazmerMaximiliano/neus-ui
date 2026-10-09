import { BeatLoader } from "react-spinners";
import "./Button.styles.css";
import { ButtonProps } from "./Button.types";
import { getButtonClasses } from "./Button.utils";

/** A token-driven action with independent variants, colors and sizes. */
export const Button = ({
  label,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  buttonStyle,
  labelStyle,
  loaderStyle,
  onClick,
}: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, color, size, fullWidth);

  return (
    <button
      className={buttonClasses}
      style={buttonStyle}
      onClick={(e) => onClick?.(e)}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={loading ? label : undefined}
    >
      {loading ? (
        <BeatLoader
          className="button-loader"
          size="1em"
          margin="0.333333em"
          color="currentColor"
          speedMultiplier={0.5}
          style={loaderStyle}
        />
      ) : (
        <span className="button-label" style={labelStyle}>{label}</span>
      )}
    </button>
  );
};
