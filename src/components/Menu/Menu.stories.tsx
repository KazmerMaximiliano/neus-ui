import { Meta, StoryObj } from "@storybook/react";
import { FaUser } from "react-icons/fa";
import { Menu as MenuComponent } from "./Menu";

const meta: Meta<typeof MenuComponent> = {
  title: "Components/Menu",
  component: MenuComponent,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: false,
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    icon: {
      description: "Icon displayed in the menu avatar",
    },
    name: {
      description: "Name displayed at the top of the dropdown menu",
      control: "text",
    },
    items: {
      description: "Array of menu items with labels and onClick functions",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Menu: Story = {
  args: {
    icon: FaUser,
    name: "John Doe",
    items: [
      {
        label: "My Profile",
        onClick: () => alert("Navigating to profile"),
      },
      {
        label: "Settings",
        onClick: () => alert("Opening settings"),
      },
      {
        label: "Help",
        onClick: () => alert("Showing help"),
      },
      {
        label: "Sign Out",
        onClick: () => alert("Signing out"),
      },
    ],
  },
};

export default meta;
