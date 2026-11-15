import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockProps = {
  readonly centerClassName?: string;
  readonly centerStyle?: CSSProperties;
  readonly className?: string;
  readonly clockClassName?: string;
  readonly displayClassName?: string;
  readonly displayStyle?: CSSProperties;
  readonly faceClassName?: string;
  readonly handTipClassName?: string;
  readonly handTipStyle?: CSSProperties;
  readonly headerClassName?: string;
  readonly indicatorClassName?: string;
  readonly numberClassName?: string;
  readonly numbersClassName?: string;
  readonly numbersStyle?: CSSProperties;
  readonly periodClassName?: string;
  readonly periodContentClassName?: string;
  readonly periodContentStyle?: CSSProperties;
  readonly segmentClassName?: string;
  readonly separatorClassName?: string;
  readonly separatorStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly value?: TimeValue;
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly format?: "12h" | "24h";
  readonly clockStyle?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly faceStyle?: CSSProperties;
  readonly segmentStyle?: CSSProperties;
  readonly periodStyle?: CSSProperties;
  readonly numberStyle?: CSSProperties;
  readonly indicatorStyle?: CSSProperties;
  readonly onChange?: (value: TimeValue) => void;
};

export type ClockStoryArgs = ClockProps & {
  readonly designSystem: DesignSystemId;
};
