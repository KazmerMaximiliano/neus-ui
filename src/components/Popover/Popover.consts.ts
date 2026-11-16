/** The first of these inside the panel takes focus when it opens; without one, focus stays on the trigger. */
export const POPOVER_INITIAL_FOCUS = [
  "a[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");
