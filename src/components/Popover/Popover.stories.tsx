import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { Popover as PopoverComponent } from "./Popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PopoverStoryArgs } from "./Popover.types";

const meta: Meta<PopoverStoryArgs> = {
  title: "Base/Popover",
  component: PopoverComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the popover",
    },
    triggerLabel: { control: "text", description: "Story only: the label of the trigger Button" },
    trigger: { control: false, description: "Renders the trigger with the props it receives" },
    label: { control: "text", description: "Accessible name of the panel" },
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
      description: "Preferred side and alignment; flips when it does not fit",
    },
    open: { control: "boolean", description: "Whether the panel is open (controlled)" },
    defaultOpen: { control: false, description: "Initial state (uncontrolled)" },
    children: { control: false, description: "Content of the panel" },
    className: { control: "text", description: "Additional classes on the popover" },
    style: { control: "object", description: "CSS properties on the popover" },
    panelClassName: { control: "text", description: "Additional classes on the panel" },
    panelStyle: { control: "object", description: "CSS properties on the panel" },
    onOpenChange: { action: "openChanged", description: "Called when the trigger, Escape or an outside click opens or closes it" },
  },
};

export const Popover: StoryObj<PopoverStoryArgs> = {
  args: {
    designSystem: "neus",
    triggerLabel: "Filters",
    label: "Filters",
    placement: "bottom-start",
    open: false,
    children: (
      <Stack gap={3}>
        <Text variant="small" tone="muted">Show projects that are</Text>
        <Checkbox label="Active" checked />
        <Checkbox label="Archived" />
      </Stack>
    ),
    className: undefined,
    style: {},
    panelClassName: undefined,
    panelStyle: {},
  },
  render: function Render({ designSystem, triggerLabel, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopoverStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <PopoverComponent
          {...args}
          trigger={(props) => <Button {...props} label={triggerLabel} variant="outlined" />}
          onOpenChange={(open) => {
            updateArgs({ open });
            onOpenChange?.(open);
          }}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
