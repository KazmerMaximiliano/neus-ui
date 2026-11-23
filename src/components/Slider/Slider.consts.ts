import type { SliderLabels } from "./Slider.types";

/** English defaults; pass `labels` in the project's language. */
export const SLIDER_LABELS: Required<SliderLabels> = {
  minimum: "Minimum",
  maximum: "Maximum",
};

/** Above this many marks, `showSteps` draws none: they would blur into a line. */
export const SLIDER_MAX_STEPS = 100;
