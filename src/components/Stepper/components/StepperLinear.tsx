import { Progress } from "../../Progress";
import type { CSSProperties } from "react";
import type { StepperProps } from "../Stepper.types";

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
    <Progress
      aria-label="Progress"
      value={currentStep + 1}
      min={1}
      max={totalSteps}
      valueText={text}
      showValue={showLabels}
      className={["stepper__track", trackClassName].filter(Boolean).join(" ")}
      style={trackStyle}
      valueClassName={["stepper__counter", labelClassName].filter(Boolean).join(" ")}
      valueStyle={labelStyle}
      trackClassName={["stepper__bar", barClassName].filter(Boolean).join(" ")}
      trackStyle={{ ...progress, ...barStyle }}
      fillClassName={["stepper__bar-fill", barFillClassName].filter(Boolean).join(" ")}
      fillStyle={barFillStyle}
    />
  );
};
