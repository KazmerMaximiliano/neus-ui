import { createElement, type CSSProperties } from "react";
import "./Text.styles.css";
import type { TextElement, TextProps } from "./Text.types";

/** Running text on the system's type scale: lead, body, small, caption or overline. */
export const Text = <C extends TextElement = "p">({
  as,
  variant = "body",
  tone = "default",
  weight,
  align = "start",
  measure = variant === "lead" || variant === "body",
  lines,
  numeric = false,
  className,
  style,
  ...props
}: TextProps<C>) =>
  createElement(as ?? "p", {
    ...props,
    className: ["text", className].filter(Boolean).join(" "),
    "data-variant": variant,
    "data-tone": tone,
    "data-weight": weight,
    "data-align": align,
    "data-measure": measure || undefined,
    "data-numeric": numeric || undefined,
    "data-lines": lines,
    style: lines === undefined ? style : ({ "--text-lines": lines, ...style } as CSSProperties),
  });
