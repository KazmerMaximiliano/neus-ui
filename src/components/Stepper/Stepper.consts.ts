import type { StepState } from "./Stepper.types";

export const STEP_STATE_TEXT: Record<StepState, string> = {
  done: "completed",
  active: "current",
  inactive: "not started",
};

