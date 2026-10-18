import { createElement } from "react";
import { Container } from "../Container/Container";
import "./Section.styles.css";
import type { SectionElement, SectionProps } from "./Section.types";

/** A full-width band of the page with its own background and vertical rhythm. */
export const Section = <C extends SectionElement = "section">({
  as,
  tone = "default",
  spacing = "lg",
  container = "lg",
  contentClassName,
  contentStyle,
  className,
  children,
  ...props
}: SectionProps<C>) =>
  createElement(
    as ?? "section",
    {
      ...props,
      className: ["section", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-spacing": spacing,
    },
    container === false ? children : (
      <Container
        size={container}
        className={["section__content", contentClassName].filter(Boolean).join(" ")}
        style={contentStyle}
      >
        {children}
      </Container>
    ),
  );
