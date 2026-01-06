import { colors } from "../theme";

export const getLoaderColor = (style: string, color: string): string => {
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

export const getIconButtonClasses = (
  variant: string,
  color: string,
  size: string
): string => {
  const classes = [
    "icon-button",
    `icon-button--${variant}-${color}`,
    `icon-button--${size}`,
  ];

  return classes.filter(Boolean).join(" ");
};

export const getIconSize = (size: string): number => {
  const sizeMap: Record<string, number> = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return sizeMap[size] || sizeMap.medium;
};

export const getLoaderSize = (size: string): number => {
  const sizeMap: Record<string, number> = {
    small: 6,
    medium: 8,
    large: 10,
  };

  return sizeMap[size] || sizeMap.medium;
};