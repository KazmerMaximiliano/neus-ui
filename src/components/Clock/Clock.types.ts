import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockProps = {
  value?: TimeValue;
  disabled?: boolean;
  readonly?: boolean;
  format?: "12h" | "24h";
  clockStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  faceStyle?: CSSProperties;
  segmentStyle?: CSSProperties;
  periodStyle?: CSSProperties;
  numberStyle?: CSSProperties;
  indicatorStyle?: CSSProperties;
  onChange?: (value: TimeValue) => void;
};

export type ClockStoryArgs = ClockProps & {
  designSystem: DesignSystemId;
};
