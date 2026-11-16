import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Radio as RadioComponent } from "./Radio";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RadioStoryArgs } from "./Radio.types";

const meta: Meta<RadioStoryArgs> = {
  title: "Base/Radio",
  component: RadioComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the radio",
    },
    value: { control: "text", description: "The value it reports and submits when chosen" },
    label: { control: "text", description: "Visible label that names the radio" },
    description: { control: "text", description: "Help text announced with the radio" },
    checked: { control: "boolean", description: "Whether it is the chosen radio (controlled)" },
    name: { control: "text", description: "The name shared by the radios of one choice" },
    required: { control: "boolean", description: "Requires a choice before the form submits" },
    disabled: { control: "boolean", description: "Disables the radio" },
    className: { control: "text", description: "Additional classes on the radio" },
    style: { control: "object", description: "CSS properties on the radio" },
    circleClassName: { control: "text", description: "Additional classes on the circle" },
    circleStyle: { control: "object", description: "CSS properties on the circle" },
    dotClassName: { control: "text", description: "Additional classes on the dot" },
    dotStyle: { control: "object", description: "CSS properties on the dot" },
    labelClassName: { control: "text", description: "Additional classes on the label" },
    labelStyle: { control: "object", description: "CSS properties on the label" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    onChange: { action: "changed", description: "Called with its value when it becomes the chosen one" },
  },
};

export const Radio: StoryObj<RadioStoryArgs> = {
  args: {
    designSystem: "neus",
    value: "express",
    label: "Express",
    description: "Next business day.",
    checked: false,
    name: "delivery",
    required: false,
    disabled: false,
    className: undefined,
    style: {},
    circleClassName: undefined,
    circleStyle: {},
    dotClassName: undefined,
    dotStyle: {},
    labelClassName: undefined,
    labelStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<RadioStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <RadioComponent
          {...args}
          onChange={(value) => {
            updateArgs({ checked: true });
            onChange?.(value);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
