import { createElement } from "react";
import type { ListProps } from "./List.types";
import "./List.styles.css";

/** A list of rows; compose it with ListItem. */
export const List = ({ as = "ul", divided = false, className, ...props }: ListProps) =>
  createElement(as, {
    ...props,
    className: ["list", className].filter(Boolean).join(" "),
    "data-divided": divided || undefined,
  });
