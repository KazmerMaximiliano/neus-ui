import { createElement } from "react";
import type { ElementType } from "react";
import type { CardMediaProps } from "./CardMedia.types";
import "./CardMedia.styles.css";

export const CardMedia = <C extends ElementType = "img">({
  component,
  className,
  style = null,
  ...props
}: CardMediaProps<C>) =>
  createElement(component ?? "img", {
    ...props,
    className: ["card-media", className].filter(Boolean).join(" "),
    style: style ?? undefined,
  });
