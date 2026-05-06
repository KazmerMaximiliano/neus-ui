import "./Stepper.styles.css";
import { StepperDots } from "./components/StepperDots";
import { StepperLinear } from "./components/StepperLinear";
import { StepperSimple } from "./components/StepperSimple";
import { StepperProps } from "./Stepper.types";

export const Stepper = ({
  currentStep,
  totalSteps,
  variant = "dots",
  size = "small",
  labels,
  showLabels = false,
  showConnectors = true,
  onStepClick,
}: StepperProps) => {
  return (
    <div className={`stepper stepper--${variant}`}>
      {variant === "dots" && (
        <StepperDots
          currentStep={currentStep}
          totalSteps={totalSteps}
          size={size}
          labels={labels}
          showLabels={showLabels}
          showConnectors={showConnectors}
          onStepClick={onStepClick}
        />
      )}
      {variant === "linear" && (
        <StepperLinear
          currentStep={currentStep}
          totalSteps={totalSteps}
          showLabels={showLabels}
        />
      )}
      {variant === "simple" && (
        <StepperSimple currentStep={currentStep} totalSteps={totalSteps} />
      )}
    </div>
  );
};
