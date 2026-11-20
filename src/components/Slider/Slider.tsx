import { type CSSProperties, useId, useState } from "react";
import type { SliderProps } from "./Slider.types";
import { SLIDER_LABELS, SLIDER_MAX_STEPS } from "./Slider.consts";
import { clamp, shareOf, stepShares } from "./Slider.utils";
import "../../css/field.css";
import "./Slider.styles.css";

const join = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

const toValues = (value: number | readonly number[] | undefined) =>
  value === undefined ? undefined : typeof value === "number" ? [value] : [...value];

/** One value, or a range with two thumbs, on native range inputs. */
export const Slider = (props: SliderProps) => {
  const {
    range,
    value,
    defaultValue,
    onChange,
    label,
    description,
    error,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    name,
    showValue = true,
    showSteps = false,
    locale = "en-US",
    formatOptions,
    labels,
    className,
    style,
    labelClassName,
    labelStyle,
    valueClassName,
    valueStyle,
    controlClassName,
    controlStyle,
    trackClassName,
    trackStyle,
    fillClassName,
    fillStyle,
    railClassName,
    railStyle,
    stepClassName,
    stepStyle,
    inputClassName,
    inputStyle,
    descriptionClassName,
    descriptionStyle,
    errorClassName,
    errorStyle,
    ...native
  } = props;
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const text = { ...SLIDER_LABELS, ...labels };
  const invalid = Boolean(error);
  const [uncontrolled, setUncontrolled] = useState(
    () => toValues(defaultValue) ?? (range ? [min, max] : [min]),
  );
  const [active, setActive] = useState(0);
  const current = (toValues(value) ?? uncontrolled).map((item) => clamp(item, min, max));
  const [low, high = low] = current;
  const formatter = new Intl.NumberFormat(locale, formatOptions);
  const shown = range
    ? `${formatter.format(low)} – ${formatter.format(high)}`
    : formatter.format(low);
  // The lower thumb rises above the upper one while it is the one in use, and always at max,
  // so two thumbs on the same spot can still move apart.
  const lowOnTop = range && (low === max || (active === 0 && high !== min));
  const steps = showSteps ? stepShares(min, max, step) : [];
  const lowShare = range ? shareOf(low, min, max) : 0;
  const highShare = shareOf(high, min, max);

  const change = (index: number, next: number) => {
    const values = [...current];
    values[index] = range ? (index === 0 ? Math.min(next, high) : Math.max(next, low)) : next;
    if (values[index] === current[index]) return;
    if (value === undefined) setUncontrolled(values);
    if (!onChange) return;
    if (props.range) props.onChange?.([values[0], values[1]]);
    else props.onChange?.(values[0]);
  };

  return (
    <div
      {...native}
      className={join(
        "slider",
        invalid && "slider--invalid",
        disabled && "slider--disabled",
        className,
      )}
      style={style}
      data-range={range || undefined}
    >
      <label
        id={labelId}
        htmlFor={range ? undefined : `${id}-input-0`}
        className={join("slider__label", labelClassName)}
        style={labelStyle}
      >
        {label}
      </label>
      {showValue && (
        // The inputs announce the value themselves.
        <span className={join("slider__value", valueClassName)} style={valueStyle} aria-hidden="true">
          {shown}
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
      <div
        role={range ? "group" : undefined}
        aria-labelledby={range ? labelId : undefined}
        className={join("slider__control", controlClassName)}
        // The filled stretch moves with the value, so it travels as custom properties.
        style={{ "--slider-start": lowShare, "--slider-end": highShare, ...controlStyle } as CSSProperties}
      >
        <span className={join("slider__track", trackClassName)} style={trackStyle} aria-hidden="true">
          {range && (
            <span className={join("slider__rail slider__rail--before", railClassName)} style={railStyle} />
          )}
          <span className={join("slider__fill", fillClassName)} style={fillStyle} />
          <span className={join("slider__rail slider__rail--after", railClassName)} style={railStyle} />
        </span>
        {steps.length > 0 && steps.length <= SLIDER_MAX_STEPS && (
          <span className="slider__steps" aria-hidden="true">
            {steps.map((share) => (
              <span
                key={share}
                className={join("slider__step", stepClassName)}
                data-active={(share >= lowShare && share <= highShare) || undefined}
                // Each mark's place on the track is a runtime value.
                style={{ "--slider-step": share, ...stepStyle } as CSSProperties}
              />
            ))}
          </span>
        )}
        {current.map((item, index) => (
          <input
            key={index}
            id={`${id}-input-${index}`}
            type="range"
            className={join("slider__input", inputClassName)}
            style={inputStyle}
            min={min}
            max={max}
            step={step}
            value={item}
            name={name}
            disabled={disabled}
            aria-label={range ? (index === 0 ? text.minimum : text.maximum) : undefined}
            aria-valuetext={formatter.format(item)}
            aria-describedby={
              join(description != null && descriptionId, invalid && errorId) || undefined
            }
            aria-invalid={invalid || undefined}
            data-raised={(index === 0) === lowOnTop || undefined}
            onFocus={() => setActive(index)}
            onChange={(event) => change(index, Number(event.target.value))}
          />
        ))}
      </div>
      {invalid && (
        <span id={errorId} className={join("slider__error", errorClassName)} style={errorStyle}>
          {error}
        </span>
      )}
    </div>
  );
};
