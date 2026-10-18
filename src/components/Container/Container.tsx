import { createElement } from "react";
import "./Container.styles.css";
import type { ContainerElement, ContainerProps } from "./Container.types";

/** Centers page content at a maximum width with responsive side padding. */
export const Container = <C extends ContainerElement = "div">({
  as,
  size = "lg",
  gutter = true,
  className,
  ...props
}: ContainerProps<C>) =>
  createElement(as ?? "div", {
    ...props,
    className: ["layout-container", className].filter(Boolean).join(" "),
    "data-size": size,
    "data-gutter": String(gutter),
  });
