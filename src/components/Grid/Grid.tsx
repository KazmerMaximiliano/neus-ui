import { createElement, type CSSProperties } from "react";
import { resolveResponsive } from "../../utils/resolveResponsive";
import { spaceValue } from "../Stack/Stack.utils";
import "./Grid.styles.css";
import type { GridElement, GridProps } from "./Grid.types";

/** Equal-width columns that change at 768px and 1024px, or as many as fit `minItemWidth`. */
export const Grid = <C extends GridElement = "div">({
  as,
  columns,
  minItemWidth,
  gap,
  className,
  style,
  ...props
}: GridProps<C>) => {
  const layout: CSSProperties = {
    ...(minItemWidth === undefined
      ? resolveResponsive("--grid-columns", columns, String)
      : ({ "--grid-min-item-width": minItemWidth } as CSSProperties)),
    ...resolveResponsive("--grid-gap", gap, spaceValue),
    ...style,
  };
  return createElement(as ?? "div", {
    ...props,
    className: ["grid", className].filter(Boolean).join(" "),
    "data-auto": minItemWidth === undefined ? undefined : "",
    style: Object.keys(layout).length ? layout : undefined,
  });
};
