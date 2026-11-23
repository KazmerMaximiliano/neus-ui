import { Bold } from "lucide-react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Toggle as ToggleComponent } from "./Toggle";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ToggleStoryArgs } from "./Toggle.types";

const meta: Meta<ToggleStoryArgs> = {
  title: "Base/Toggle",
  component: ToggleComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the toggle",
    },
    label: { control: "text", description: "Visible text, or the accessible name with iconOnly" },
    icon: { control: false, description: "The lucide icon component before the label" },
    iconOnly: { control: "boolean", description: "Shows the icon alone; the label becomes its name" },
    pressed: { control: "boolean", description: "Whether the toggle is on (controlled)" },
    size: { control: "select", options: ["small", "medium", "large"], description: "Height and padding" },
    disabled: { control: "boolean", description: "Disables the toggle" },
    value: { control: "text", description: "Identifies the toggle inside a ToggleGroup" },
    className: { control: "text", description: "Additional classes on the button" },
    style: { control: "object", description: "CSS properties on the button" },
    iconClassName: { control: "text", description: "Additional classes on the icon" },
    iconStyle: { control: "object", description: "CSS properties on the icon" },
    labelClassName: { control: "text", description: "Additional classes on the label" },
    labelStyle: { control: "object", description: "CSS properties on the label" },
    onPressedChange: { action: "pressedChanged", description: "Called with the new pressed state" },
  },
};

export const Toggle: StoryObj<ToggleStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Bold",
    icon: Bold,
    iconOnly: false,
    pressed: false,
    size: "medium",
    disabled: false,
    value: undefined,
    className: undefined,
    style: {},
    iconClassName: undefined,
    iconStyle: {},
    labelClassName: undefined,
    labelStyle: {},
  },
  render: function Render({ designSystem, onPressedChange, ...args }) {
    const [, updateArgs] = useArgs<ToggleStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <ToggleComponent
          {...args}
          onPressedChange={(pressed) => {
            updateArgs({ pressed });
            onPressedChange?.(pressed);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
