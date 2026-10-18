import { createElement, type CSSProperties } from "react";
import { resolveResponsive } from "../../utils/resolveResponsive";
import "./Stack.styles.css";
import type { StackElement, StackProps } from "./Stack.types";
import { spaceValue } from "./Stack.utils";

/** Lays children out in a column or a row with a gap from the space scale. */
export const Stack = <C extends StackElement = "div">({
  as,
  direction,
  gap,
  align,
  justify,
  wrap = false,
  className,
  style,
  ...props
}: StackProps<C>) => {
  const layout: CSSProperties = {
    ...resolveResponsive("--stack-direction", direction, String),
    ...resolveResponsive("--stack-gap", gap, spaceValue),
    ...style,
  };
  return createElement(as ?? "div", {
    ...props,
    className: ["stack", className].filter(Boolean).join(" "),
    "data-align": align,
    "data-justify": justify,
    "data-wrap": wrap || undefined,
    style: Object.keys(layout).length ? layout : undefined,
  });
};
