import { createElement } from "react";
import "./Card.styles.css";
import type { CardElement, CardProps } from "./Card.types";

export const Card = <C extends CardElement = "div">({
  as,
  className,
  style = null,
  variant = "auto",
  ...props
}: CardProps<C>) =>
  createElement(as ?? "div", {
    ...props,
    "data-variant": variant,
    className: ["card", className].filter(Boolean).join(" "),
    style: style ?? undefined,
  });
