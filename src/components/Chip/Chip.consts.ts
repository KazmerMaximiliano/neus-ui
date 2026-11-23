import type { ChipLabels } from "./Chip.types";

/** English defaults; pass `labels` in the project's language. */
export const CHIP_LABELS: Required<ChipLabels> = {
  remove: (label) => `Remove ${label}`,
};
