import type { CSSProperties } from "react";
import "./MediaPlaceholder.styles.css";
import type { MediaPlaceholderProps } from "./MediaPlaceholder.types";

/** A sized frame that stands in for a picture not taken yet and says what it will show. */
export const MediaPlaceholder = ({
  label,
  ratio = "4 / 3",
  className,
  style,
  labelClassName,
  labelStyle,
  ...props
}: MediaPlaceholderProps) => (
  <div
    {...props}
    role="img"
    aria-label={label}
    className={["media-placeholder", className].filter(Boolean).join(" ")}
    style={{ "--media-placeholder-ratio": ratio, ...style } as CSSProperties}
  >
    <span aria-hidden className={["media-placeholder__label", labelClassName].filter(Boolean).join(" ")} style={labelStyle}>
      {label}
    </span>
  </div>
);
