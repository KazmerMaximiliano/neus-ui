import { Meta, StoryObj } from "@storybook/react";
import { Checkbox as CheckboxComponent } from "./Checkbox";

const meta: Meta<typeof CheckboxComponent> = {
  title: "Components/Checkbox",
  component: CheckboxComponent,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: false,
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "The name attribute for the checkbox input",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    onChange: {
      action: "checkbox changed",
      description: "Callback function triggered when checkbox state changes",
      table: {
        type: { summary: "(checked: boolean) => void" },
        category: "Events",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    name: "example-checkbox",
    checked: false,
    onChange: (checked: boolean) => console.log("Checkbox changed:", checked),
  },
};

export default meta;
