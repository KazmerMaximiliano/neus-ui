import { Meta, StoryObj } from "@storybook/react";
import { FaUser } from "react-icons/fa";
import { Dropdown as DropdownComponent } from "./Dropdown";

const meta: Meta<typeof DropdownComponent> = {
  title: "Components/Dropdown",
  component: DropdownComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Icon displayed in the dropdown avatar",
    },
    name: {
      description: "Name displayed at the top of the dropdown panel",
      control: "text",
    },
    items: {
      description: "Array of dropdown items with labels and onClick functions",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
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
