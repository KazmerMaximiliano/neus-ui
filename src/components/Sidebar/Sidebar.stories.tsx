import { Meta, StoryObj } from "@storybook/react";
import { Files, House, LogOut, Settings, User } from "lucide-react";
import { Sidebar as SidebarComponent } from "./Sidebar";

const meta: Meta<typeof SidebarComponent> = {
  title: "Components/Sidebar",
  component: SidebarComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
      description: "Array of sidebar navigation items",
      table: {
        type: { summary: "SidebarItem[]" },
        category: "Props",
      },
    },
    title: {
      control: { type: "text" },
      description: "Optional title for the sidebar",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {
  args: {
    title: "Navigation",
    items: [
      {
        label: "Dashboard",
        icon: House,
        onClick: () => console.log("Dashboard clicked"),
        active: true,
        visible: true,
      },
      {
        label: "Profile",
        icon: User,
        onClick: () => console.log("Profile clicked"),
        active: false,
        visible: true,
      },
      {
        label: "Documents",
        icon: Files,
        onClick: () => console.log("Documents clicked"),
        active: false,
        visible: true,
      },
      {
        label: "Settings",
        icon: Settings,
        onClick: () => console.log("Settings clicked"),
        active: false,
        visible: true,
      },
      {
        label: "Logout",
        icon: LogOut,
        onClick: () => console.log("Logout clicked"),
        active: false,
        visible: true,
      },
    ],
  },
};

export default meta;
