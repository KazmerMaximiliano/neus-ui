import { StepperProps } from "../Stepper.types";

export const StepperSimple = ({ currentStep, totalSteps }: StepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="stepper__track" aria-label="Progress">
      {steps.map((index) => {
        const isActive = index <= currentStep;
        return (
          <div
            key={index}
            className={`stepper__simple-dot${isActive ? " stepper__simple-dot--active" : ""}`}
            aria-current={index === currentStep ? "step" : undefined}
          />
        );
      })}
    </div>
  );
};
