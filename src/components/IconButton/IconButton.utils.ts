export const getIconButtonClasses = (
  variant: string,
  color: string,
  size: string,
): string =>
  [
    "icon-button",
    `icon-button--${variant}`,
    `icon-button--${color}`,
    `icon-button--${size}`,
  ].join(" ");
