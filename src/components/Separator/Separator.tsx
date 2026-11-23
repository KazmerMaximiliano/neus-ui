import type { SeparatorProps } from "./Separator.types";
import "./Separator.styles.css";

/** A line between groups of content, across or down a row. */
export const Separator = ({
  orientation = "horizontal",
  decorative = false,
  className,
  ...props
}: SeparatorProps) => (
  <div
    {...props}
    className={["separator", className].filter(Boolean).join(" ")}
    data-orientation={orientation}
    role={decorative ? "none" : "separator"}
    // A separator is horizontal unless it says otherwise.
    aria-orientation={!decorative && orientation === "vertical" ? "vertical" : undefined}
  />
);
