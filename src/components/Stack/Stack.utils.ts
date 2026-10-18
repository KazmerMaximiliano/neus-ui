import type { SpaceStep } from "./Stack.types";

/** CSS value of a space step. */
export const spaceValue = (step: SpaceStep) => step === 0 ? "0px" : `var(--space-${step})`;
