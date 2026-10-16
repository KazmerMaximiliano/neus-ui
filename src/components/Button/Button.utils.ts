export const getButtonClasses = (
  variant: string,
  color: string,
  size: string,
  fullWidth: boolean,
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