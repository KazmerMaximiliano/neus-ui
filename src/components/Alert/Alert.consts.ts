import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { AlertLive, AlertStatus } from "./Alert.types";

export const ALERT_ICONS = { info: Info, success: CircleCheck, warning: TriangleAlert, error: CircleAlert } as const satisfies Record<AlertStatus, unknown>;

export const ALERT_ROLES: Record<AlertLive, "alert" | "status" | undefined> = {
  assertive: "alert",
  polite: "status",
  off: undefined,
};
