import type { Meta, StoryObj } from "@storybook/react";
import { designSystemControl, withDesignSystem } from "../../../.storybook/designSystem";
import { Input } from "../../components";
import { FormTemplate as FormTemplateComponent } from "./FormTemplate";
import type { DesignSystemPreviewArgs } from "../../../.storybook/designSystem.types";
import type { FormTemplateProps } from "./FormTemplate.types";

const meta: Meta<FormTemplateProps & DesignSystemPreviewArgs> = {
  title: "Templates/FormTemplate",
  component: FormTemplateComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [withDesignSystem],
  argTypes: {
    designSystem: designSystemControl,
    actionsClassName: { control: "text", description: "Additional classes for actions" },
    actions: { control: false, description: "Composed custom actions" },
    className: { control: "text", description: "className override" },
    style: { control: "object", description: "style override" },
    actionsStyle: { control: "object", description: "actionsStyle override" },
    columns: { control: "number", description: "columns override" },
    tabletColumns: { control: "number", description: "tabletColumns override" },
    mobileColumns: { control: "number", description: "mobileColumns override" },
    gap: { control: "text", description: "gap override" },

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
    designSystem: "global",
    actionsClassName: undefined,
    actions: undefined,
    className: undefined,
    style: {},
    actionsStyle: {},
    columns: 2,
    tabletColumns: 2,
    mobileColumns: 1,
    gap: undefined,

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
