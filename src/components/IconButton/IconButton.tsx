import { BeatLoader } from "react-spinners";
import "./IconButton.styles.css";
import { ButtonProps } from "./IconButton.types";
import {
  getIconButtonClasses,
  getIconSize,
  getLoaderColor,
  getLoaderSize,
} from "./IconButton.utils";

export const IconButton = ({
  icon: Icon,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) => {
  const buttonClasses = getIconButtonClasses(variant, color, size);
  const loaderColor = getLoaderColor(variant, color);
  const iconSize = getIconSize(size);
  const loaderSize = getLoaderSize(size);

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <BeatLoader
          color={loaderColor}
          size={loaderSize}
          speedMultiplier={0.5}
        />
      ) : (
        <Icon size={iconSize} />
      )}
    </button>
  );
};
