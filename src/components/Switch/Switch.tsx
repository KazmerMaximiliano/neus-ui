import { useId } from "react";
import "../../css/field.css";
import "./Switch.styles.css";
import type { SwitchProps } from "./Switch.types";

export const Switch = ({
  className,
  style,
  labelClassName,
  labelStyle,
  trackClassName,
  trackStyle,
  thumbClassName,
  thumbStyle,
  descriptionClassName,
  descriptionStyle,
  label,
  description,
  onChange,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ...native
}: SwitchProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  return (
    <label
      className={["switch", className].filter(Boolean).join(" ")}
      style={style}
    >
      {label && (
        <span
          id={labelId}
          className={["switch__label", labelClassName]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
        >
          {label}
        </span>
      )}
      <input
        {...native}
        className="switch__input"
        type="checkbox"
        role="switch"
        // The wrapping label also holds the description; naming by the label alone keeps it out of the name.
        aria-labelledby={label ? labelId : labelledBy}
        aria-describedby={
          [describedBy, description != null && descriptionId]
            .filter(Boolean)
            .join(" ") || undefined
        }
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span
        className={["switch__track", trackClassName].filter(Boolean).join(" ")}
        style={trackStyle}
        aria-hidden="true"
      >
        <span
          className={["switch__thumb", thumbClassName]
            .filter(Boolean)
            .join(" ")}
          style={thumbStyle}
        />
      </span>
      {description != null && (
        <span
          id={descriptionId}
          className={["field__description", descriptionClassName]
            .filter(Boolean)
            .join(" ")}
          style={descriptionStyle}
        >
          {description}
        </span>
      )}
    </label>
  );
};
