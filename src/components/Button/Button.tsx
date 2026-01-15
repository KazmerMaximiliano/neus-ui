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
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) => {
  const colors = useColors();
  const buttonClasses = getButtonClasses(variant, color, fullWidth);
  const loaderColor = getLoaderColor(variant, color, colors);

  return (
    <button
      className={buttonClasses}
      onClick={(e) => onClick?.(e)}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <BeatLoader size={6} color={loaderColor} speedMultiplier={0.5} />
      ) : (
        label
      )}
    </button>
  );
};
