import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { ThemeProvider as Provider } from "./ThemeProvider";

const meta: Meta<typeof Provider> = {
  title: "Theming/ThemeProvider",
  component: Provider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "Design system applied to this scope",
    },
    colorScheme: {
      control: "select", options: ["light", "dark"],
      description: "Controlled color scheme",
    },
    initialColorScheme: {
      control: "select", options: ["light", "dark"],
      description: "Initial mode when colorScheme is not controlled",
    },
    initialTheme: { control: "object", description: "Initial action-color overrides; remount to reinitialize" },
    scope: { control: "select", options: ["local", "global"], description: "Nested providers always remain local" },
    className: { control: "text", description: "Class for the local scope wrapper" },
    children: { control: false, description: "Components using this theme" },
  },
};

export const ThemeProvider: StoryObj<typeof Provider> = {
  args: {
    designSystem: "neus",
    colorScheme: "light",
    initialColorScheme: "light",
    initialTheme: {},
    scope: "local",
    className: "",
    children: <><Input label="Name" placeholder="Enter your name" /><Button label="Continue" /></>,
  },
};

export default meta;
