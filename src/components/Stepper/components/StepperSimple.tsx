import type { StepperProps } from "../Stepper.types";
import { STEPPER_TEXTS } from "../Stepper.consts";

export const StepperSimple = ({
  dotClassName,
  trackClassName,
  trackStyle,
  currentStep,
  totalSteps,
  dotStyle,
  texts,
}: StepperProps) => {
  const words = { ...STEPPER_TEXTS, ...texts };
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div
      className={["stepper__track", trackClassName].filter(Boolean).join(" ")}
      style={trackStyle}
      role="progressbar"
      aria-label={words.progress}
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuetext={words.position(currentStep + 1, totalSteps)}
    >
      {steps.map((index) => (
        <div
          key={index}
          className={[
            `stepper__simple-dot${index <= currentStep ? " stepper__simple-dot--active" : ""}${index === currentStep ? " stepper__simple-dot--current" : ""
            }`,
            dotClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={dotStyle}
        />
      ))}
    </div>
  );
};
