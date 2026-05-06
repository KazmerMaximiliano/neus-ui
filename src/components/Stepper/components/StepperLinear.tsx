import { StepperProps } from "../Stepper.types";

export const StepperLinear = ({
  currentStep,
  totalSteps,
  showLabels,
}: StepperProps) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="stepper__track">
      {showLabels && (
        <span className="stepper__counter">
          Step {currentStep + 1} of {totalSteps}
        </span>
      )}
      <div
        className="stepper__bar"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="stepper__bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
