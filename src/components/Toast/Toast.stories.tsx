import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider, ToastProvider, useToast } from "../../providers";
import { Button } from "../Button";
import { Toast as ToastComponent } from "./Toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ToastOptions } from "../../providers";
import type { ToastStoryArgs } from "./Toast.types";
import "./Toast.stories.css";

const ShowToast = (toast: ToastOptions) => {
  const { show } = useToast();
  return (
    <Button label="Show toast" variant="outlined" onClick={() => show(toast)} />
  );
};

const meta: Meta<ToastStoryArgs> = {
  title: "Feedback/Toast",
  // No `component`: the dismiss props are a union, so the controls stay flat and render splits them.
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the toast",
    },
    status: {
      control: "select",
      options: ["info", "success", "warning", "error"],
      description:
        "Meaning of the message; sets the color and the default icon",
    },
    title: { control: "text", description: "Short summary in bold" },
    children: { control: "text", description: "The message" },
    actions: {
      control: false,
      description: "Buttons or links under the message",
    },
    icon: {
      control: false,
      description: "Replaces the status icon; null removes it",
    },
    duration: {
      control: "number",
      description:
        "Milliseconds before it closes itself; empty keeps it open. Hover and focus pause it",
    },
    dismissLabel: {
      control: "text",
      description: "Accessible name of the close button",
    },
    onDismiss: {
      action: "dismissed",
      description: "Called by the close button and when the time runs out",
    },
    placement: {
      control: "select",
      options: [
        "top-start",
        "top-center",
        "top-end",
        "bottom-start",
        "bottom-center",
        "bottom-end",
      ],
      description:
        "Preview control: ToastProvider corner for the Show toast button",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Preview control: ToastProvider toasts on screen at once",
    },
    className: {
      control: "text",
      description: "Additional classes on the toast",
    },
    style: { control: "object", description: "CSS properties on the toast" },
    iconClassName: {
      control: "text",
      description: "Additional classes on the icon",
    },
    iconStyle: { control: "object", description: "CSS properties on the icon" },
    titleClassName: {
      control: "text",
      description: "Additional classes on the title",
    },
    titleStyle: {
      control: "object",
      description: "CSS properties on the title",
    },
    contentClassName: {
      control: "text",
      description: "Additional classes on the message",
    },
    contentStyle: {
      control: "object",
      description: "CSS properties on the message",
    },
    actionsClassName: {
      control: "text",
      description: "Additional classes on the actions",
    },
    actionsStyle: {
      control: "object",
      description: "CSS properties on the actions",
    },
    dismissClassName: {
      control: "text",
      description: "Additional classes on the close button",
    },
    dismissStyle: {
      control: "object",
      description: "CSS properties on the close button",
    },
  },
};

export const Toast: StoryObj<ToastStoryArgs> = {
  args: {
    designSystem: "neus",
    status: "success",
    title: "Changes saved",
    children: "Your profile is up to date.",
    duration: null,
    dismissLabel: "Dismiss",
    placement: "bottom-end",
    max: 3,
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
  render: ({
    designSystem,
    placement,
    max,
    dismissLabel,
    onDismiss,
    ...args
  }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <ToastProvider
        placement={placement}
        max={max}
        dismissLabel={dismissLabel}
      >
        <div className="toast-story">
          <ToastComponent
            {...args}
            dismissLabel={dismissLabel}
            onDismiss={() => onDismiss?.()}
          />
          <ShowToast
            status={args.status}
            title={args.title}
            message={args.children}
          />
        </div>
      </ToastProvider>
    </ThemeProvider>
  ),
};

export default meta;
