import { StepperDots } from "./components/StepperDots";
import { StepperLinear } from "./components/StepperLinear";
import { StepperSimple } from "./components/StepperSimple";
import type { StepperProps } from "./Stepper.types";
import "./Stepper.styles.css";

export const Stepper = ({
  className,
  style,
  variant = "dots",
  size = "small",
  ...props
}: StepperProps) => (
  <div
    className={[`stepper stepper--${variant} stepper--${size}`, className]
      .filter(Boolean)
      .join(" ")}
    style={style}
  >
    {variant === "dots" && <StepperDots size={size} {...props} />}
    {variant === "linear" && <StepperLinear {...props} />}
    {variant === "simple" && <StepperSimple {...props} />}
  </div>
);
