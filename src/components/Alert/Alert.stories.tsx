import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button/Button";
import { Alert as AlertComponent } from "./Alert";
import type { AlertStoryArgs } from "./Alert.types";

const meta: Meta<AlertStoryArgs> = {
  title: "Feedback/Alert",
  // No `component`: the dismiss props are a union, so the controls stay flat and render splits them.
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the alert",
    },
    status: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description: "Meaning of the message; sets the color and the default icon",
    },
    title: { control: "text", description: "Short summary in bold" },
    children: { control: "text", description: "The message" },
    actions: { control: false, description: "Buttons or links under the message" },
    icon: { control: false, description: "Replaces the status icon; null removes it" },
    live: {
      control: "select",
      options: ["polite", "assertive", "off"],
      description: "polite: role=status; assertive: role=alert, for errors that appear after an action; off: no role",
    },
    dismissible: { control: "boolean", description: "Preview control: renders the close button" },
    dismissLabel: { control: "text", description: "Accessible name of the close button; required with onDismiss" },
    onDismiss: { action: "dismissed", description: "Shows a close button that calls this" },
    className: { control: "text", description: "Additional classes on the alert" },
    style: { control: "object", description: "CSS properties on the alert" },
    iconClassName: { control: "text", description: "Additional classes on the icon" },
    iconStyle: { control: "object", description: "CSS properties on the icon" },
    titleClassName: { control: "text", description: "Additional classes on the title" },
    titleStyle: { control: "object", description: "CSS properties on the title" },
    contentClassName: { control: "text", description: "Additional classes on the message" },
    contentStyle: { control: "object", description: "CSS properties on the message" },
    actionsClassName: { control: "text", description: "Additional classes on the actions" },
    actionsStyle: { control: "object", description: "CSS properties on the actions" },
    dismissClassName: { control: "text", description: "Additional classes on the close button" },
    dismissStyle: { control: "object", description: "CSS properties on the close button" },
  },
};

export const Alert: StoryObj<AlertStoryArgs> = {
  args: {
    designSystem: "neus",
    status: "warning",
    title: "Your trial ends in 3 days",
    children: "Add a payment method to keep your sessions and your history.",
    actions: <Button label="Add payment method" size="small" variant="outlined" />,
    live: "polite",
    dismissible: true,
    dismissLabel: "Dismiss",
    className: undefined,
    style: {},
    iconClassName: undefined,
    iconStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    contentClassName: undefined,
    contentStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
    dismissClassName: undefined,
    dismissStyle: {},
  },
  render: ({ designSystem, dismissible, dismissLabel, onDismiss, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      {dismissible
        ? <AlertComponent {...args} onDismiss={() => onDismiss?.()} dismissLabel={dismissLabel} />
        : <AlertComponent {...args} />}
    </ThemeProvider>
  ),
};

export default meta;
