import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

type StepperVariant = "dots" | "linear" | "simple";
type StepperSize = "small" | "medium" | "large";

export type StepperProps = {
  readonly barClassName?: string;
  readonly barFillClassName?: string;
  readonly barFillStyle?: CSSProperties;
  readonly checkClassName?: string;
  readonly checkStyle?: CSSProperties;
  readonly className?: string;
  readonly connectorClassName?: string;
  readonly dotClassName?: string;
  readonly labelClassName?: string;
  readonly srOnlyClassName?: string;
  readonly srOnlyStyle?: CSSProperties;
  readonly stepClassName?: string;
  readonly stepStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly trackClassName?: string;
  readonly trackStyle?: CSSProperties;
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly variant?: StepperVariant;
  readonly size?: StepperSize;
  readonly labels?: readonly string[];
  readonly showLabels?: boolean;
  readonly showConnectors?: boolean;
  readonly dotStyle?: CSSProperties;
  readonly labelStyle?: CSSProperties;
  readonly connectorStyle?: CSSProperties;
  readonly barStyle?: CSSProperties;
  readonly onStepClick?: (step: number) => void;
};

export type StepperStoryArgs = StepperProps & {
  readonly designSystem: DesignSystemId;
};

export type StepState = "inactive" | "active" | "done";
