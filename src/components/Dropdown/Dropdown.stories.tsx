import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";
import { fn } from "storybook/test";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Dropdown as DropdownComponent } from "./Dropdown";
import type { DropdownStoryArgs } from "./Dropdown.types";

const meta: Meta<DropdownStoryArgs> = {
  title: "Base/Dropdown",
  component: DropdownComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the dropdown",
    },
    icon: {
      control: false,
      description: "Avatar icon; without it the avatar shows the name initial",
    },
    name: {
      control: "text",
      description:
        "Account name shown in the menu header and used as trigger label",
    },
    items: {
      control: "object",
      description: "Menu items with label, onClick and optional disabled",
    },
    triggerStyle: {
      control: "object",
      description: "CSS properties applied to the avatar trigger",
    },
    menuStyle: {
      control: "object",
      description: "CSS properties applied to the floating menu panel",
    },
    itemStyle: {
      control: "object",
      description: "CSS properties applied to every menu item",
    },
  },
};

export const Dropdown: StoryObj<DropdownStoryArgs> = {
  args: {
    designSystem: "neus",
    icon: User,
    name: "Ada Lovelace",
    items: [
      { label: "Profile", onClick: fn() },
      { label: "Settings", onClick: fn() },
      { label: "Sign out", onClick: fn() },
    ],
    triggerStyle: {},
    menuStyle: {},
    itemStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <DropdownComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
