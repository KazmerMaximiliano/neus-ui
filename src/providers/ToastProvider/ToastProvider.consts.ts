import type { ToastLive } from "./ToastProvider.types";

export const TOAST_DURATION = 5000;

export const TOAST_MAX = 3;

export const TOAST_LABELS = {
  region: "Notifications",
  dismiss: "Dismiss",
} as const;

/** One list per politeness, both mounted while empty so screen readers announce what arrives. */
export const TOAST_LIVE: readonly ToastLive[] = ["polite", "assertive"];
