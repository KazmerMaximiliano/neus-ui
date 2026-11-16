import { useContext, useId } from "react";
import { RadioContext } from "./Radio.context";
import type { RadioProps } from "./Radio.types";
import "../../css/field.css";
import "./Radio.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** A native radio; inside a RadioGroup, the group fills in what the radio does not set. */
export const Radio = ({
  className,
  style,
  circleClassName,
  circleStyle,
  dotClassName,
  dotStyle,
  labelClassName,
  labelStyle,
  descriptionClassName,
  descriptionStyle,
  value,
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ...native
}: RadioProps) => {
  const group = useContext(RadioContext);
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const groupValue = group?.value === undefined ? undefined : group.value === value;
  const groupDefault = group?.defaultValue === undefined ? undefined : group.defaultValue === value;

  return (
    <label className={join("radio", className)} style={style}>
      <input
        aria-invalid={group?.invalid || undefined}
        {...native}
        className="radio__input"
        type="radio"
        value={value}
        name={native.name ?? group?.name}
        required={native.required ?? group?.required}
        checked={checked ?? groupValue}
        defaultChecked={defaultChecked ?? groupDefault}
        // The wrapping label also holds the description; naming by the label alone keeps it out of the name.
        aria-labelledby={label ? labelId : labelledBy}
        aria-describedby={join(describedBy, description != null && descriptionId) || undefined}
        onChange={() => {
          onChange?.(value);
          group?.onChange?.(value);
        }}
      />
      <span className={join("radio__circle", circleClassName)} style={circleStyle} aria-hidden="true">
        <span className={join("radio__dot", dotClassName)} style={dotStyle} />
      </span>
      {label && (
        <span id={labelId} className={join("radio__label", labelClassName)} style={labelStyle}>
          {label}
        </span>
      )}
      {description != null && (
        <span
          id={descriptionId}
          className={join("field__description", descriptionClassName)}
          style={descriptionStyle}
        >
          {description}
        </span>
      )}
    </label>
  );
};
