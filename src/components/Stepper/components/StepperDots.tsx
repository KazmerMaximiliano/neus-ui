import { Check } from "lucide-react";
import { Fragment } from "react";
import { StepperProps } from "../Stepper.types";
import { STEP_STATE_TEXT } from "../Stepper.consts";
import {
  getConnectorClasses,
  getDotClasses,
  getLabelClasses,
  getStepState,
} from "../Stepper.utils";

export const StepperDots = ({
  checkClassName,
  checkStyle,
  connectorClassName,
  dotClassName,
  labelClassName,
  srOnlyClassName,
  srOnlyStyle,
  stepClassName,
  stepStyle,
  trackClassName,
  trackStyle,
  currentStep,
  totalSteps,
  size = "small",
  labels,
  showLabels,
  showConnectors,
  dotStyle,
  labelStyle,
  connectorStyle,
  onStepClick,
}: StepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <nav
      className={["stepper__track", trackClassName].filter(Boolean).join(" ")}
      style={trackStyle}
      aria-label="Progress"
    >
      {steps.map((index) => {
        const state = getStepState(index, currentStep);
        const isDone = state === "done";
        const isClickable = isDone && !!onStepClick;
        const label = labels?.[index];
        const visibleLabel = showLabels && label;
        const Dot = isClickable ? "button" : "span";

        return (
          <Fragment key={index}>
            <div
              className={["stepper__step", stepClassName]
                .filter(Boolean)
                .join(" ")}
              style={stepStyle}
            >
              <Dot
                className={[
                  getDotClasses(state, size, isClickable),
                  dotClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={dotStyle}
                aria-current={state === "active" ? "step" : undefined}
                {...(isClickable && {
                  type: "button" as const,
                  onClick: () => onStepClick!(index),
                })}
              >
                <span aria-hidden>
                  {isDone ? (
                    <Check
                      className={["stepper__check", checkClassName]
                        .filter(Boolean)
                        .join(" ")}
                      style={checkStyle}
                    />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={["stepper__sr-only", srOnlyClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={srOnlyStyle}
                >
                  {`Step ${index + 1}${label && !visibleLabel ? `: ${label}` : ""}, ${STEP_STATE_TEXT[state]}`}
                </span>
              </Dot>
              {visibleLabel && (
                <span
                  className={[
                    `${getLabelClasses(state)} stepper__label--${size}`,
                    labelClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={labelStyle}
                >
                  {label}
                </span>
              )}
            </div>
            {showConnectors !== false && index < totalSteps - 1 && (
              <div
                className={[
                  getConnectorClasses(isDone, size),
                  connectorClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={connectorStyle}
                aria-hidden="true"
              />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
