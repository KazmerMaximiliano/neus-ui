import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type StepperVariant = "dots" | "linear" | "simple";
type StepperSize = "small" | "medium" | "large";

export type StepperProps = {
  barClassName?: string;
  barFillClassName?: string;
  barFillStyle?: CSSProperties;
  checkClassName?: string;
  checkStyle?: CSSProperties;
  className?: string;
  connectorClassName?: string;
  dotClassName?: string;
  labelClassName?: string;
  srOnlyClassName?: string;
  srOnlyStyle?: CSSProperties;
  stepClassName?: string;
  stepStyle?: CSSProperties;
  style?: CSSProperties;
  trackClassName?: string;
  trackStyle?: CSSProperties;
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
