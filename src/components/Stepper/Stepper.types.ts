type StepperVariant = "dots" | "linear" | "simple";
type StepperSize = "small" | "medium" | "large";

export type StepperProps = {
  currentStep: number;
  totalSteps: number;
  variant?: StepperVariant;
  size?: StepperSize;
  labels?: string[];
  showLabels?: boolean;
  showConnectors?: boolean;
  onStepClick?: (step: number) => void;
};
