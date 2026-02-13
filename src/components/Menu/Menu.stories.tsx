import { Meta, StoryObj } from "@storybook/react";
import { EllipsisVertical } from "lucide-react";
import { Menu as MenuComponent } from "./Menu";

const meta: Meta<typeof MenuComponent> = {
  title: "Components/Menu",
  component: MenuComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Icon to display as the menu trigger (uses IconButton)",
    },
    text: {
      description: "Text to display as the menu trigger (uses Button)",
      control: "text",
    },
    items: {
      description: "Array of menu items with labels and onClick functions",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Menu: Story = {
  args: {
    icon: EllipsisVertical,
    items: [
      {
        label: "Edit",
        onClick: () => alert("Edit"),
      },
      {
        label: "Delete",
        onClick: () => alert("Delete"),
      },
      {
        label: "Share",
        onClick: () => alert("Share"),
      },
    ],
  },
};

export default meta;
