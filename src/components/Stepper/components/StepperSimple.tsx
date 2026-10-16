import { StepperProps } from "../Stepper.types";

export const StepperSimple = ({
  currentStep,
  totalSteps,
  dotStyle,
}: StepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div
      className="stepper__track"
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuetext={`Step ${currentStep + 1} of ${totalSteps}`}
    >
      {steps.map((index) => (
        <div
          key={index}
          className={`stepper__simple-dot${index <= currentStep ? " stepper__simple-dot--active" : ""}${
            index === currentStep ? " stepper__simple-dot--current" : ""
          }`}
          style={dotStyle}
        />
      ))}
    </div>
  );
};
