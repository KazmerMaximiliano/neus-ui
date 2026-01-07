import { Meta, StoryObj } from "@storybook/react";
import { MultiSelect as MultiSelectComponent } from "./MultiSelect";

const meta: Meta<typeof MultiSelectComponent> = {
  title: "Components/MultiSelect",
  component: MultiSelectComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "The name attribute for the multiselect input",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    options: {
      control: { type: "object" },
      description: "Array of options with value and label properties",
      table: {
        type: { summary: "{ value: string; label: string }[]" },
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
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the multiselect",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    label: {
      control: { type: "text" },
      description:
        "Label text for the multiselect (automatically used when placeholder is provided)",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    value: {
      control: { type: "object" },
      description: "Array of currently selected values",
      table: {
        type: { summary: "string[]" },
        category: "Props",
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the multiselect is disabled",
      table: {
        type: { summary: "boolean" },
        category: "Props",
      },
    },
    onChange: {
      action: "values changed",
      description: "Callback function triggered when selected values change",
      table: {
        type: { summary: "(values: string[]) => void" },
        category: "Events",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const MultiSelect: Story = {
  args: {
    name: "example-multiselect",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
    ],
    placeholder: "Select multiple options...",
    value: ["option1"],
    disabled: false,
    onChange: (values: string[]) => console.log("Selected values:", values),
  },
};

export default meta;
