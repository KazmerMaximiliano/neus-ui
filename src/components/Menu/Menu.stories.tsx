import type { Meta, StoryObj } from "@storybook/react";
import { EllipsisVertical } from "lucide-react";
import { fn } from "storybook/test";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Menu as MenuComponent } from "./Menu";
import type { MenuStoryArgs } from "./Menu.types";

const meta: Meta<MenuStoryArgs> = {
  title: "Base/Menu",
  component: MenuComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    buttonLabelClassName: {
      control: "text",
      description: "Additional classes for buttonLabel",
    },
    buttonLabelStyle: {
      control: "object",
      description: "Style override for buttonLabel",
    },
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    iconButtonIconClassName: {
      control: "text",
      description: "Additional classes for iconButtonIcon",
    },
    iconButtonIconStyle: {
      control: "object",
      description: "Style override for iconButtonIcon",
    },
    itemClassName: {
      control: "text",
      description: "Additional classes for item",
    },
    menuClassName: {
      control: "text",
      description: "Additional classes for menu",
    },
    style: { control: "object", description: "Style override for style" },
    triggerClassName: {
      control: "text",
      description: "Additional classes for trigger",
    },
    triggerStyle: {
      control: "object",
      description: "Style override for trigger",
    },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the menu",
    },
    icon: {
      control: false,
      description: "Icon-only trigger rendered with the IconButton recipe",
    },
    text: {
      control: "text",
      description: "Trigger label; names the icon trigger when an icon is set",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the trigger",
    },
    items: {
      control: "object",
      description: "Menu items with label, onClick and optional disabled",
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

export const Menu: StoryObj<MenuStoryArgs> = {
  args: {
    buttonLabelClassName: undefined,
    buttonLabelStyle: undefined,
    className: undefined,
    iconButtonIconClassName: undefined,
    iconButtonIconStyle: undefined,
    itemClassName: undefined,
    menuClassName: undefined,
    style: undefined,
    triggerClassName: undefined,
    triggerStyle: undefined,
    designSystem: "neus",
    icon: EllipsisVertical,
    text: "Row actions",
    size: "medium",
    items: [
      { label: "Edit", onClick: fn() },
      { label: "Duplicate", onClick: fn(), disabled: true },
      { label: "Delete", onClick: fn() },
    ],
    menuStyle: {},
    itemStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <MenuComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
