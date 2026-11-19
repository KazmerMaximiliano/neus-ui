import { SELECT_LABELS } from "../Select";
import type { MultiSelectLabels } from "./MultiSelect.types";

export const MULTI_SELECT_LABELS: Required<MultiSelectLabels> = {
  ...SELECT_LABELS,
  unselected: "Select options",
  remove: (option) => `Remove ${option}`,
};
