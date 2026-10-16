import { StepperDots } from "./components/StepperDots";
import { StepperLinear } from "./components/StepperLinear";
import { StepperSimple } from "./components/StepperSimple";
import "./Stepper.styles.css";
import { StepperProps } from "./Stepper.types";

export const Stepper = ({
  variant = "dots",
  size = "small",
  ...props
}: StepperProps) => (
  <div className={`stepper stepper--${variant} stepper--${size}`}>
    {variant === "dots" && <StepperDots size={size} {...props} />}
    {variant === "linear" && <StepperLinear {...props} />}
    {variant === "simple" && <StepperSimple {...props} />}
  </div>
);
