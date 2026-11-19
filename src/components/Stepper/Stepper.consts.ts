import type { StepperTexts } from "./Stepper.types";

export const STEPPER_TEXTS: Required<StepperTexts> = {
  progress: "Progress",
  position: (step, total) => `Step ${step} of ${total}`,
  step: (step) => `Step ${step}`,
  done: "completed",
  active: "current",
  inactive: "not started",
};
