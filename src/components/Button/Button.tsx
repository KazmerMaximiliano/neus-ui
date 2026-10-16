import { BeatLoader } from "react-spinners";
import "./Button.styles.css";
import { ButtonProps } from "./Button.types";
import { getButtonClasses } from "./Button.utils";

export const Button = ({
  className,
  labelClassName,
  loaderClassName,
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
      className={[buttonClasses, className].filter(Boolean).join(" ")}
      style={buttonStyle}
      onClick={(e) => onClick?.(e)}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={loading ? label : undefined}
    >
      <span
        className={["button-label", labelClassName].filter(Boolean).join(" ")}
        style={labelStyle}
        aria-hidden={loading || undefined}
      >
        {label}
      </span>
      {loading && (
        <BeatLoader
          className={["button-loader", loaderClassName]
            .filter(Boolean)
            .join(" ")}
          size="1em"
          margin="0.333333em"
          color="currentColor"
          speedMultiplier={0.5}
          style={loaderStyle}
        />
      )}
    </button>
  );
};
