import { Trash2 } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { IconButton } from "../IconButton";
import { Tooltip as TooltipComponent } from "./Tooltip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TooltipStoryArgs } from "./Tooltip.types";

const meta: Meta<TooltipStoryArgs> = {
  title: "Base/Tooltip",
  component: TooltipComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the tooltip",
    },
    triggerLabel: { control: "text", description: "Story only: the accessible name of the IconButton" },
    content: { control: "text", description: "Short text that describes the trigger" },
    trigger: { control: false, description: "Renders the trigger with the props it receives" },
    placement: {
      control: "select",
      options: ["top", "bottom"],
      description: "Preferred side, centered on the trigger; flips when it does not fit",
    },
    delay: { control: "number", description: "Milliseconds of hover before it shows" },
    className: { control: "text", description: "Additional classes on the tooltip" },
    style: { control: "object", description: "CSS properties on the tooltip" },
  },
};

export const Tooltip: StoryObj<TooltipStoryArgs> = {
  args: {
    designSystem: "neus",
    triggerLabel: "Delete project",
    content: "Moves it to the trash for 30 days",
    placement: "top",
    delay: 150,
    className: undefined,
    style: {},
  },
  render: ({ designSystem, triggerLabel, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <TooltipComponent
        {...args}
        trigger={(props) => <IconButton {...props} icon={Trash2} label={triggerLabel} variant="outlined" />}
      />
    </ThemeProvider>
  ),
};

export default meta;
