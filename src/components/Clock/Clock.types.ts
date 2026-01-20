export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockProps = {
  value?: TimeValue;
  disabled?: boolean;
  readonly?: boolean;
  format?: "12h" | "24h";
  onChange?: (value: TimeValue) => void;
};

// value?: TimeValue;
// defaultValue?: TimeValue;
// name?: string;
// label?: string;
// required?: boolean;
// error?: string;
