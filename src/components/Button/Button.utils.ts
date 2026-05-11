import { ThemeColors } from "../../providers";

export const getLoaderColor = (style: string, color: string, colors: ThemeColors): string => {
  if (style === "solid" && color === "white") {
    return "#0a0a14";
  }

  if (style === "solid") {
    return colors.white;
  }

  if (color === "white") {
    return "#ffffff";
  }

  const colorMap: Record<string, string> = {
    primary: colors.primary.main,
    success: colors.success.main,
    error: colors.error.main,
    info: colors.info.main,
    disabled: colors.gray[500],
  };

  return colorMap[color] || colorMap.primary;
};

export const getButtonClasses = (
  variant: string,
  color: string,
  size: string,
  fullWidth: boolean
): string => {
  const classes = [
    "button",
    `button--${variant}`,
    `button--${color}`,
    `button--${size}`,
    fullWidth ? "button--full-width" : "",
  ];

  return classes.filter(Boolean).join(" ");
};