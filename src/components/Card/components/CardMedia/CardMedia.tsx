import type { ElementType } from "react";
import { createElement } from "react";
import "./CardMedia.styles.css";
import type { CardMediaProps } from "./CardMedia.types";

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
