import { ThemeColors } from "../../providers";

export const getLoaderColor = (style: string, color: string, colors: ThemeColors): string => {
  if (style === "solid") {
    return colors.white;
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
  fullWidth: boolean
): string => {
  const classes = [
    "button",
    `button--${variant}-${color}`,
    fullWidth ? "button--full-width" : "",
  ];

  return classes.filter(Boolean).join(" ");
};