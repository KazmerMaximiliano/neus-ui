type StepState = "inactive" | "active" | "done";

export const getStepState = (index: number, currentStep: number): StepState => {
  if (index < currentStep) return "done";
  if (index === currentStep) return "active";
  return "inactive";
};

export const getDotClasses = (
  state: StepState,
  size: string,
  clickable: boolean,
): string => {
  const classes = ["stepper__dot", `stepper__dot--${state}`, `stepper__dot--${size}`];
  if (clickable) classes.push("stepper__dot--clickable");
  return classes.join(" ");
};

export const getLabelClasses = (state: StepState): string =>
  `stepper__label stepper__label--${state}`;

export const getConnectorClasses = (done: boolean, size: string): string => {
  const classes = ["stepper__connector", `stepper__connector--size-${size}`];
  if (done) classes.push("stepper__connector--done");
  return classes.join(" ");
};
