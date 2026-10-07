import { BeatLoader } from "react-spinners";
import { useColors } from "../theme";
import "./Button.styles.css";
import { ButtonProps } from "./Button.types";
import { getButtonClasses, getLoaderColor } from "./Button.utils";

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
  const colors = useColors();
  const buttonClasses = getButtonClasses(variant, color, size, fullWidth);
  const loaderColor = getLoaderColor(variant, color, colors);

  return (
    <button
      className={buttonClasses}
      style={buttonStyle}
      onClick={(e) => onClick?.(e)}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <BeatLoader
          size={6}
          color={loaderColor}
          speedMultiplier={0.5}
          style={loaderStyle}
        />
      ) : (
        <span style={labelStyle}>{label}</span>
      )}
    </button>
  );
};
