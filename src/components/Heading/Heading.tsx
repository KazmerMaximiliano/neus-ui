import "./Heading.styles.css";
import type { HeadingProps } from "./Heading.types";
import { HEADING_SIZES } from "./Heading.consts";

/** A heading whose document level (`as`) and visual size (`size`) are chosen separately. */
export const Heading = ({ as: Tag = "h2", size, align = "start", balance = true, className, ...props }: HeadingProps) => (
  <Tag
    {...props}
    className={["heading", className].filter(Boolean).join(" ")}
    data-size={size ?? HEADING_SIZES[Tag]}
    data-align={align}
    data-balance={balance || undefined}
  />
);
