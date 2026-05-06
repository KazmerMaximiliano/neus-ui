import { Check } from "lucide-react";
import { Fragment } from "react";
import { StepperProps } from "../Stepper.types";
import {
  getConnectorClasses,
  getDotClasses,
  getLabelClasses,
  getStepState,
} from "../Stepper.utils";

export const StepperDots = ({
  currentStep,
  totalSteps,
  size = "small",
  labels,
  showLabels,
  showConnectors,
  onStepClick,
}: StepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  const resolvedSize = size ?? "small";

  return (
    <nav className="stepper__track" aria-label="Progress">
      {steps.map((index) => {
        const state = getStepState(index, currentStep);
        const isDone = state === "done";
        const isClickable = isDone && !!onStepClick;
        const label = labels?.[index];

        return (
          <Fragment key={index}>
            <div className="stepper__step">
              <div
                className={getDotClasses(state, resolvedSize, isClickable)}
                aria-current={state === "active" ? "step" : undefined}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onClick={isClickable ? () => onStepClick!(index) : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => e.key === "Enter" && onStepClick!(index)
                    : undefined
                }
              >
                {isDone ? (
                  <Check
                    size={resolvedSize === "large" ? 20 : resolvedSize === "medium" ? 16 : 12}
                    strokeWidth={2.5}
                  />
                ) : (
                  index + 1
                )}
              </div>
              {showLabels && label && (
                <span className={`${getLabelClasses(state)} stepper__label--${resolvedSize}`}>
                  {label}
                </span>
              )}
            </div>
            {showConnectors !== false && index < totalSteps - 1 && (
              <div
                className={getConnectorClasses(isDone, resolvedSize)}
                aria-hidden="true"
              />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
