import type { CSSProperties } from "react";
import { StepperProps } from "../Stepper.types";

export const StepperLinear = ({
  barClassName,
  barFillClassName,
  barFillStyle,
  labelClassName,
  trackClassName,
  trackStyle,
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
    <div
      className={["stepper__track", trackClassName].filter(Boolean).join(" ")}
      style={trackStyle}
    >
      {showLabels && (
        <span
          className={["stepper__counter", labelClassName]
            .filter(Boolean)
            .join(" ")}
          style={labelStyle}
          aria-hidden
        >
          {text}
        </span>
      )}
      <div
        className={["stepper__bar", barClassName].filter(Boolean).join(" ")}
        style={{ ...progress, ...barStyle }}
        role="progressbar"
        aria-label="Progress"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={text}
      >
        <div
          className={["stepper__bar-fill", barFillClassName]
            .filter(Boolean)
            .join(" ")}
          style={barFillStyle}
        />
      </div>
    </div>
  );
};
