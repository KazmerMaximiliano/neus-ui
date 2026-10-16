import type { CSSProperties } from "react";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockNumbersProps = {
  numberStyle?: CSSProperties;
  mode: "hours" | "minutes";
  format: "12h" | "24h";
  currentValue: TimeValue;
};

export type DialNumber = { key: string; label: string; selected: boolean; inner?: boolean; };
