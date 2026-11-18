import { type CSSProperties, useId } from "react";
import type { ProgressProps } from "./Progress.types";
import "./Progress.styles.css";

export const Progress = ({
  value,
  min = 0,
  max = 100,
  label,
  showValue = false,
  valueText,
  size = "medium",
  className,
  style,
  labelClassName,
  labelStyle,
  valueClassName,
  valueStyle,
  trackClassName,
  trackStyle,
  fillClassName,
  fillStyle,
  ...props
}: ProgressProps) => {
  const labelId = useId();
  const determinate = value !== undefined;
  const current = determinate ? Math.min(Math.max(value, min), max) : undefined;
  const share =
    current === undefined ? undefined : (current - min) / (max - min || 1);
  const shownValue =
    valueText ??
    (share === undefined ? undefined : `${Math.round(share * 100)}%`);

  const join = (...names: (string | false | undefined)[]) =>
    names.filter(Boolean).join(" ");

  return (
    <div
      aria-labelledby={label ? labelId : undefined}
      {...props}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={determinate ? min : undefined}
      aria-valuemax={determinate ? max : undefined}
      aria-valuetext={valueText}
      className={join(
        `progress progress--${size}`,
        !determinate && "progress--indeterminate",
        className,
      )}
      // The filled share is a runtime value, so it travels as a custom property.
      style={{ "--progress-value": share, ...style } as CSSProperties}
    >
      {label && (
        <span
          id={labelId}
          className={join("progress__label", labelClassName)}
          style={labelStyle}
        >
          {label}
        </span>
      )}
      {showValue && shownValue && (
        <span
          className={join("progress__value", valueClassName)}
          style={valueStyle}
          aria-hidden
        >
          {shownValue}
        </span>
      )}
      <div
        className={join("progress__track", trackClassName)}
        style={trackStyle}
      >
        <div
          className={join("progress__fill", fillClassName)}
          style={fillStyle}
        />
      </div>
    </div>
  );
};
