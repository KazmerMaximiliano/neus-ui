import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Switch } from "../Switch";
import { Fieldset as FieldsetComponent } from "./Fieldset";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FieldsetStoryArgs } from "./Fieldset.types";

const meta: Meta<FieldsetStoryArgs> = {
  title: "Form/Fieldset",
  component: FieldsetComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the fieldset",
    },
    label: { control: "text", description: "Legend that names the group" },
    description: { control: "text", description: "Help text announced with the group" },
    error: { control: "text", description: "Error message after the controls" },
    required: { control: "boolean", description: "Shows the required mark on the legend" },
    disabled: { control: "boolean", description: "Disables every control inside" },
    children: { control: false, description: "The controls in the group" },
    className: { control: "text", description: "Additional classes on the fieldset" },
    style: { control: "object", description: "CSS properties on the fieldset" },
    labelClassName: { control: "text", description: "Additional classes on the legend" },
    labelStyle: { control: "object", description: "CSS properties on the legend" },
    requiredClassName: { control: "text", description: "Additional classes on the required mark" },
    requiredStyle: { control: "object", description: "CSS properties on the required mark" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    contentClassName: { control: "text", description: "Additional classes on the controls' container" },
    contentStyle: { control: "object", description: "CSS properties on the controls' container" },
    errorClassName: { control: "text", description: "Additional classes on the error message" },
    errorStyle: { control: "object", description: "CSS properties on the error message" },
  },
};

export const Fieldset: StoryObj<FieldsetStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Notifications",
    description: "Choose where we let you know about new orders.",
    error: undefined,
    required: false,
    disabled: false,
    children: [
      <Switch key="email" label="Email" defaultChecked />,
      <Switch key="sms" label="Text message" />,
      <Switch key="push" label="Push notification" />,
    ],
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    requiredClassName: undefined,
    requiredStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    contentClassName: undefined,
    contentStyle: {},
    errorClassName: undefined,
    errorStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <FieldsetComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
