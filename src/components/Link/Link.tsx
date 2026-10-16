import "./Link.styles.css";
import { LinkProps } from "./Link.types";

export const Link = ({
  label,
  type = "primary",
  href = "#",
  className,
  style = null,
  ...props
}: LinkProps) => (
  <a
    {...props}
    className={["link", `link--${type}`, className].filter(Boolean).join(" ")}
    href={href}
    style={style ?? undefined}
  >
    {label}
  </a>
);
