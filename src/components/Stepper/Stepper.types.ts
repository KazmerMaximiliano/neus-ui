import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

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
  dotStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  connectorStyle?: CSSProperties;
  barStyle?: CSSProperties;
  onStepClick?: (step: number) => void;
};

export type StepperStoryArgs = StepperProps & {
  designSystem: DesignSystemId;
};

export type StepState = "inactive" | "active" | "done";
