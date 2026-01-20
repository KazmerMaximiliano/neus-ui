export type TimeValue = {
  hours: number;
  minutes: number;
};

export type ClockNumbersProps = {
  mode: "hours" | "minutes";
  format: "12h" | "24h";
  currentValue: TimeValue;
};
