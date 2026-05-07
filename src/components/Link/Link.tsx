import "./Link.styles.css";
import { LinkProps } from "./Link.types";

export const Link = ({ label, type = "primary", href = "#", onClick }: LinkProps) => {
  return (
    <a className={`link link--${type}`} href={href} onClick={onClick}>
      {label}
    </a>
  );
};
