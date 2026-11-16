import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Switch as SwitchComponent } from "./Switch";
import type { SwitchStoryArgs } from "./Switch.types";

const meta: Meta<SwitchStoryArgs> = {
  title: "Base/Switch",
  component: SwitchComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the switch",
    },
    label: {
      control: "text",
      description: "Visible label that names the switch",
    },
    description: {
      control: "text",
      description: "Help text announced with the switch",
    },
    checked: {
      control: "boolean",
      description: "Whether the setting is on (controlled)",
    },
    disabled: { control: "boolean", description: "Disables the switch" },
    name: { control: "text", description: "The name submitted with a form" },
    value: { control: "text", description: "The value submitted while on" },
    className: {
      control: "text",
      description: "Additional classes on the switch",
    },
    style: { control: "object", description: "CSS properties on the switch" },
    labelClassName: {
      control: "text",
      description: "Additional classes on the label",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties on the label",
    },
    trackClassName: {
      control: "text",
      description: "Additional classes on the track",
    },
    trackStyle: {
      control: "object",
      description: "CSS properties on the track",
    },
    thumbClassName: {
      control: "text",
      description: "Additional classes on the thumb",
    },
    thumbStyle: {
      control: "object",
      description: "CSS properties on the thumb",
    },
    descriptionClassName: {
      control: "text",
      description: "Additional classes on the description",
    },
    descriptionStyle: {
      control: "object",
      description: "CSS properties on the description",
    },
    onChange: {
      action: "changed",
      description: "Called with the new checked state",
    },
  },
};

export const Switch: StoryObj<SwitchStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Email notifications",
    description: "A summary of the week, every Monday.",
    checked: false,
    disabled: false,
    name: "notifications",
    value: "on",
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    trackClassName: undefined,
    trackStyle: {},
    thumbClassName: undefined,
    thumbStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<SwitchStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <SwitchComponent
          {...args}
          onChange={(checked) => {
            updateArgs({ checked });
            onChange?.(checked);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
