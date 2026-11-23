import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Radio } from "../Radio";
import { RadioGroup as RadioGroupComponent } from "./RadioGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RadioGroupStoryArgs } from "./RadioGroup.types";

const meta: Meta<RadioGroupStoryArgs> = {
  title: "Form/RadioGroup",
  component: RadioGroupComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the group",
    },
    label: { control: "text", description: "Legend that names the group" },
    description: { control: "text", description: "Help text announced with the group" },
    error: { control: "text", description: "Error message; marks the group invalid" },
    value: { control: "text", description: "The selected value (controlled); null selects nothing" },
    name: { control: "text", description: "The name its radios submit with a form" },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Stacks the radios or lays them in a wrapping row",
    },
    required: { control: "boolean", description: "Requires a choice before the form submits" },
    disabled: { control: "boolean", description: "Disables every radio" },
    children: { control: false, description: "Radio elements" },
    className: { control: "text", description: "Additional classes on the group" },
    style: { control: "object", description: "CSS properties on the group" },
    labelClassName: { control: "text", description: "Additional classes on the legend" },
    labelStyle: { control: "object", description: "CSS properties on the legend" },
    requiredClassName: { control: "text", description: "Additional classes on the required mark" },
    requiredStyle: { control: "object", description: "CSS properties on the required mark" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    optionsClassName: { control: "text", description: "Additional classes on the options" },
    optionsStyle: { control: "object", description: "CSS properties on the options" },
    errorClassName: { control: "text", description: "Additional classes on the error message" },
    errorStyle: { control: "object", description: "CSS properties on the error message" },
    onChange: { action: "changed", description: "Called with the value of the chosen radio" },
  },
};

export const RadioGroup: StoryObj<RadioGroupStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Delivery",
    description: "Prices include taxes.",
    error: undefined,
    value: "standard",
    name: "delivery",
    orientation: "vertical",
    required: false,
    disabled: false,
    children: [
      <Radio key="standard" value="standard" label="Standard" description="3 to 5 business days." />,
      <Radio key="express" value="express" label="Express" description="Next business day." />,
      <Radio key="pickup" value="pickup" label="Store pickup" />,
    ],
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    requiredClassName: undefined,
    requiredStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    optionsClassName: undefined,
    optionsStyle: {},
    errorClassName: undefined,
    errorStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<RadioGroupStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <RadioGroupComponent
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
