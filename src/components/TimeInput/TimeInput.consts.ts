import { CLOCK_LABELS } from "../Clock";
import type { TimeInputLabels } from "./TimeInput.types";

export const TIME_INPUT_LABELS: Required<TimeInputLabels> = {
  ...CLOCK_LABELS,
  clock: (label) => (label ? `${label}: clock` : "Clock"),
};
