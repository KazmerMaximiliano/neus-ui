import type { CSSProperties } from "react";
import { StepperProps } from "../Stepper.types";

export const StepperLinear = ({
  currentStep,
  totalSteps,
  showLabels,
  labelStyle,
  barStyle,
}: StepperProps) => {
  const text = `Step ${currentStep + 1} of ${totalSteps}`;
  const progress = {
    "--stepper-progress": (currentStep + 1) / totalSteps,
  } as CSSProperties;

  return (
    <div className="stepper__track">
      {showLabels && (
        <span className="stepper__counter" style={labelStyle} aria-hidden>
          {text}
        </span>
      )}
      <div
        className="stepper__bar"
        style={{ ...progress, ...barStyle }}
        role="progressbar"
        aria-label="Progress"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={text}
      >
        <div className="stepper__bar-fill" />
      </div>
    </div>
  );
};
