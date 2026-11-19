import type { ClockLabels } from "./Clock.types";

export const KEY_STEPS: Record<string, number> = {
  ArrowUp: 1,
  ArrowRight: 1,
  ArrowDown: -1,
  ArrowLeft: -1,
  PageUp: 5,
  PageDown: -5,
};

export const INNER_RING_THRESHOLD = 70 / 240;

export const CLOCK_LABELS: Required<ClockLabels> = { hours: "Hours", minutes: "Minutes" };
