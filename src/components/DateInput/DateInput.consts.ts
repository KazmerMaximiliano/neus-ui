import type { DateInputLabels } from "./DateInput.types";

export const DATE_INPUT_LABELS: Required<DateInputLabels> = {
  calendar: (label) => (label ? `${label}: calendar` : "Calendar"),
};
