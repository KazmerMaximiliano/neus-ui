import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { NumberInput as NumberInputComponent } from "./NumberInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { NumberInputStoryArgs } from "./NumberInput.types";

const meta: Meta<NumberInputStoryArgs> = {
  title: "Base/NumberInput",
  component: NumberInputComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the field",
    },
    label: { control: "text", description: "Label that names the field" },
    description: { control: "text", description: "Help text announced with the field" },
    error: { control: "text", description: "Error message; marks the field invalid" },
    value: { control: "number", description: "The number (controlled); null leaves the field empty" },
    min: { control: "number", description: "Lowest value" },
    max: { control: "number", description: "Highest value" },
    step: { control: "number", description: "Amount the arrow keys and steppers add" },
    largeStep: { control: "number", description: "Amount Page Up and Page Down add; ten steps by default" },
    precision: { control: "number", description: "Decimals kept; the decimals of step by default" },
    locale: { control: "text", description: "Locale that formats and reads the number" },
    formatOptions: { control: "object", description: "Intl.NumberFormat options: currency, percent or unit" },
    hideStepper: { control: "boolean", description: "Hides the minus and plus buttons" },
    labels: { control: "object", description: "Accessible names of the steppers" },
    name: { control: "text", description: "Name the number submits with a form" },
    placeholder: { control: "text", description: "Text shown while the field is empty" },
    variant: { control: "select", options: ["auto", "filled", "outlined"], description: "Field container" },
    labelPlacement: {
      control: "select",
      options: ["auto", "external", "floating"],
      description: "Label above the field or inside it",
    },
    size: { control: "select", options: ["small", "medium", "large"], description: "Field height" },
    required: { control: "boolean", description: "Requires a number before the form submits" },
    disabled: { control: "boolean", description: "Disables the field and its steppers" },
    readonly: { control: "boolean", description: "Shows the number without letting it change" },
    stepperClassName: { control: "text", description: "Additional classes on the steppers" },
    stepperStyle: { control: "object", description: "CSS properties on the steppers" },
    incrementClassName: { control: "text", description: "Additional classes on the plus button" },
    incrementStyle: { control: "object", description: "CSS properties on the plus button" },
    decrementClassName: { control: "text", description: "Additional classes on the minus button" },
    decrementStyle: { control: "object", description: "CSS properties on the minus button" },
    onChange: { action: "changed", description: "Called with the settled number, or null when cleared" },
  },
};

export const NumberInput: StoryObj<NumberInputStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Price",
    description: "Before taxes.",
    error: undefined,
    value: 1250,
    min: 0,
    max: 100000,
    step: 0.01,
    largeStep: 100,
    precision: undefined,
    locale: "en-US",
    formatOptions: { style: "currency", currency: "USD" },
    hideStepper: false,
    labels: { increment: "Increase", decrement: "Decrease" },
    name: "price",
    placeholder: undefined,
    variant: "auto",
    labelPlacement: "auto",
    size: "medium",
    required: false,
    disabled: false,
    readonly: false,
    stepperClassName: undefined,
    stepperStyle: {},
    incrementClassName: undefined,
    incrementStyle: {},
    decrementClassName: undefined,
    decrementStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<NumberInputStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <NumberInputComponent
          {...args}
          onChange={(value) => {
            updateArgs({ value });
            onChange?.(value);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
