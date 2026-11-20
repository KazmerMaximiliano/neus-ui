import { CalendarDays, LayoutGrid, List } from "lucide-react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Toggle } from "../Toggle";
import { ToggleGroup as ToggleGroupComponent } from "./ToggleGroup";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ToggleGroupStoryArgs } from "./ToggleGroup.types";

const meta: Meta<ToggleGroupStoryArgs> = {
  title: "Base/ToggleGroup",
  // No `component`: the args preview each variant through plain controls, not the component's union of props.
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the group",
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "One pressed toggle like radios, or any number of them",
    },
    value: { control: "text", description: "The pressed toggle (controlled); several separated by commas" },
    label: { control: "text", description: "Accessible name of the group" },
    orientation: { control: "select", options: ["horizontal", "vertical"], description: "Row or column" },
    size: { control: "select", options: ["small", "medium", "large"], description: "Size of every toggle" },
    disabled: { control: "boolean", description: "Disables every toggle" },
    iconOnly: { control: "boolean", description: "Preview only: icon toggles without visible text" },
    children: { control: false, description: "The Toggle elements, each with a value" },
    className: { control: "text", description: "Additional classes on the group" },
    style: { control: "object", description: "CSS properties on the group" },
    onChange: { action: "changed", description: "Called with the pressed value, or the pressed values" },
  },
};

export const ToggleGroup: StoryObj<ToggleGroupStoryArgs> = {
  args: {
    designSystem: "neus",
    type: "single",
    value: "list",
    label: "View",
    orientation: "horizontal",
    size: "medium",
    disabled: false,
    iconOnly: false,
    className: undefined,
    style: {},
  },
  render: function Render({ designSystem, type, value = "", iconOnly, onChange, ...args }) {
    const [, updateArgs] = useArgs<ToggleGroupStoryArgs>();
    const toggles = (
      <>
        <Toggle value="list" label="List" icon={List} iconOnly={iconOnly} />
        <Toggle value="grid" label="Grid" icon={LayoutGrid} iconOnly={iconOnly} />
        <Toggle value="calendar" label="Calendar" icon={CalendarDays} iconOnly={iconOnly} />
      </>
    );
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        {type === "multiple" ? (
          <ToggleGroupComponent
            {...args}
            type="multiple"
            value={value.split(",").filter(Boolean)}
            onChange={(next) => {
              updateArgs({ value: next.join(",") });
              onChange?.(next);
            }}
          >
            {toggles}
          </ToggleGroupComponent>
        ) : (
          <ToggleGroupComponent
            {...args}
            value={value}
            onChange={(next) => {
              updateArgs({ value: next });
              onChange?.(next);
            }}
          >
            {toggles}
          </ToggleGroupComponent>
        )}
      </ThemeProvider>
    );
  },
};

export default meta;
