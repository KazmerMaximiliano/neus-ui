import { SPINNER_DOTS } from "./Spinner.consts";
import "./Spinner.styles.css";
import type { SpinnerProps } from "./Spinner.types";

export const Spinner = ({
  label,
  variant = "ring",
  size = "medium",
  className,
  ringClassName,
  ringStyle,
  dotClassName,
  dotStyle,
  labelClassName,
  labelStyle,
  ...props
}: SpinnerProps) => (
  <span
    {...props}
    role={label ? "status" : undefined}
    aria-hidden={label ? undefined : true}
    className={[`spinner spinner--${variant} spinner--${size}`, className]
      .filter(Boolean)
      .join(" ")}
  >
    {variant === "ring" ? (
      <span
        className={["spinner__ring", ringClassName].filter(Boolean).join(" ")}
        style={ringStyle}
      />
    ) : (
      SPINNER_DOTS.map((dot) => (
        <span
          key={dot}
          className={["spinner__dot", dotClassName].filter(Boolean).join(" ")}
          style={dotStyle}
        />
      ))
    )}
    {label && (
      <span
        className={["spinner__label", labelClassName].filter(Boolean).join(" ")}
        style={labelStyle}
      >
        {label}
      </span>
    )}
  </span>
);
