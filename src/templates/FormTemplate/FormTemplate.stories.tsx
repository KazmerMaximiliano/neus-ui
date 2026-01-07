import { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../components";
import { FormTemplate as FormTemplateComponent } from "./FormTemplate";

const meta: Meta<typeof FormTemplateComponent> = {
  title: "Templates/FormTemplate",
  component: FormTemplateComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Content to display in the main area",
      defaultValue: "Main content area",
    },
    submitLabel: {
      control: "text",
      description: "Label for the submit button",
      defaultValue: "Submit",
    },
    loading: {
      control: "boolean",
      description: "Loading state for the submit button",
      defaultValue: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export const FormTemplate: Story = {
  args: {
    children: (
      <>
        <Input placeholder="Enter your username" />
        <Input placeholder="Enter your password" type="password" />
      </>
    ),
    submitLabel: "Submit",
    loading: false,
  },
};

export default meta;
