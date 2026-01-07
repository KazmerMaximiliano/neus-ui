import { Meta, StoryObj } from "@storybook/react";
import { Select as SelectComponent } from "./Select";

const meta: Meta<typeof SelectComponent> = {
  title: "Components/Select",
  component: SelectComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "object" },
      description: "Array of options with value and label properties",
      table: {
        type: { summary: "SelectOption[]" },
        category: "Props",
      },
    },
    name: {
      control: { type: "text" },
      description: "The name attribute for the select input",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    value: {
      control: { type: "text" },
      description: "The current selected value",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    defaultValue: {
      control: { type: "text" },
      description: "The default selected value (for uncontrolled usage)",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the select",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    label: {
      control: { type: "text" },
      description:
        "Label text for the select (automatically used when placeholder is provided)",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    error: {
      control: { type: "text" },
      description: "Error message to display",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the select is disabled",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    onChange: {
      action: "value changed",
      description: "Callback function triggered when selected value changes",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ],
    name: "example-select",
    placeholder: "Select an option...",
    value: "option1",
    defaultValue: "",
    disabled: false,
    onChange: (value: string) => console.log("Selected value:", value),
  },
};

export default meta;
