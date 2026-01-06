import { Meta, StoryObj } from "@storybook/react";
import { Actions as ActionsComponent } from "./Actions";

const meta: Meta<typeof ActionsComponent> = {
  title: "Components/Actions",
  component: ActionsComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onInfo: {
      action: "info clicked",
      description: "Callback function triggered when info action is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    onEdit: {
      action: "edit clicked",
      description: "Callback function triggered when edit action is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    onDelete: {
      action: "delete clicked",
      description: "Callback function triggered when delete action is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Actions: Story = {
  args: {
    onInfo: () => alert("Info clicked"),
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
  },
};

export default meta;
