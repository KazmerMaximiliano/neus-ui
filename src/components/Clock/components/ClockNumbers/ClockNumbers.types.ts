import type { CSSProperties } from "react";
import type { TimeValue } from "../../Clock.types";

export type ClockNumbersProps = {
  readonly numberClassName?: string;
  readonly numberStyle?: CSSProperties;
  readonly mode: "hours" | "minutes";
  readonly format: "12h" | "24h";
  readonly currentValue: TimeValue;
};

export type DialNumber = { key: string; label: string; selected: boolean; inner?: boolean; };
