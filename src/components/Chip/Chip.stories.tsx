import { Tag } from "lucide-react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Chip as ChipComponent } from "./Chip";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ChipStoryArgs } from "./Chip.types";

const meta: Meta<ChipStoryArgs> = {
  title: "Base/Chip",
  // No `component`: `selectable` and `removable` are preview args that switch the callbacks on.
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the chip",
    },
    label: { control: "text", description: "Text of the chip" },
    icon: { control: false, description: "A decorative lucide icon before the label" },
    selectable: { control: "boolean", description: "Preview only: makes the chip a toggle" },
    selected: { control: "boolean", description: "Whether a selectable chip is on (controlled)" },
    removable: { control: "boolean", description: "Preview only: adds the remove button" },
    size: { control: "select", options: ["small", "medium"], description: "Height, padding and type size" },
    disabled: { control: "boolean", description: "Disables the chip's buttons" },
    labels: { control: false, description: "Built-in texts: remove(label)" },
    className: { control: "text", description: "Additional classes on the chip" },
    style: { control: "object", description: "CSS properties on the chip" },
    iconClassName: { control: "text", description: "Additional classes on the icon" },
    iconStyle: { control: "object", description: "CSS properties on the icon" },
    actionClassName: { control: "text", description: "Additional classes on the toggle button" },
    actionStyle: { control: "object", description: "CSS properties on the toggle button" },
    labelClassName: { control: "text", description: "Additional classes on the label" },
    labelStyle: { control: "object", description: "CSS properties on the label" },
    removeClassName: { control: "text", description: "Additional classes on the remove button" },
    removeStyle: { control: "object", description: "CSS properties on the remove button" },
    removeIconClassName: { control: "text", description: "Additional classes on the remove icon" },
    removeIconStyle: { control: "object", description: "CSS properties on the remove icon" },
    onSelectedChange: { action: "selectedChanged", description: "Called with the new selected state" },
    onRemove: { action: "removed", description: "Called when the remove button is pressed" },
  },
};

export const Chip: StoryObj<ChipStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Design",
    icon: Tag,
    selectable: true,
    selected: false,
    removable: false,
    size: "medium",
    disabled: false,
    className: undefined,
    style: {},
    iconClassName: undefined,
    iconStyle: {},
    actionClassName: undefined,
    actionStyle: {},
    labelClassName: undefined,
    labelStyle: {},
    removeClassName: undefined,
    removeStyle: {},
    removeIconClassName: undefined,
    removeIconStyle: {},
  },
  render: function Render({ designSystem, selectable, selected, removable, onSelectedChange, onRemove, ...args }) {
    const [, updateArgs] = useArgs<ChipStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <ChipComponent
          {...args}
          selected={selectable ? selected : undefined}
          onSelectedChange={selectable ? (next) => {
            updateArgs({ selected: next });
            onSelectedChange?.(next);
          } : undefined}
          onRemove={removable ? () => onRemove?.() : undefined}
        />
      </ThemeProvider>
    );
  },
};

export default meta;
