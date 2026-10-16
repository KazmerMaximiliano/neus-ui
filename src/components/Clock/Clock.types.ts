import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockProps = {
  centerClassName?: string;
  centerStyle?: CSSProperties;
  className?: string;
  clockClassName?: string;
  displayClassName?: string;
  displayStyle?: CSSProperties;
  faceClassName?: string;
  handTipClassName?: string;
  handTipStyle?: CSSProperties;
  headerClassName?: string;
  indicatorClassName?: string;
  numberClassName?: string;
  numbersClassName?: string;
  numbersStyle?: CSSProperties;
  periodClassName?: string;
  periodContentClassName?: string;
  periodContentStyle?: CSSProperties;
  segmentClassName?: string;
  separatorClassName?: string;
  separatorStyle?: CSSProperties;
  style?: CSSProperties;
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
