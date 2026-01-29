import { Meta, StoryObj } from "@storybook/react";
import { FaBell, FaCog, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { AppTemplate as AppTemplateComponent } from "./AppTemplate";

const meta: Meta<typeof AppTemplateComponent> = {
  title: "Templates/AppTemplate",
  component: AppTemplateComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Content to display in the main area",
      defaultValue: "Main content area",
    },
    routes: {
      control: "object",
      description: "Sidebar navigation items",
    },
    menu: {
      control: false,
      description: "Optional menu component for the header",
    },
  },
};

type Story = StoryObj<typeof meta>;

const defaultRoutes = [
  {
    label: "Home",
    icon: FaHome,
    onClick: () => console.log("Home clicked"),
    active: true,
    visible: true,
  },
  {
    label: "Profile",
    icon: FaUser,
    onClick: () => console.log("Profile clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Search",
    icon: FaSearch,
    onClick: () => console.log("Search clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Settings",
    icon: FaCog,
    onClick: () => console.log("Settings clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Notifications",
    icon: FaBell,
    onClick: () => console.log("Notifications clicked"),
    active: false,
    visible: false,
  },
];

const menuItems = [
  {
    label: "Logout",
    onClick: () => console.log("Logout clicked"),
  },
];

export const AppTemplate: Story = {
  args: {
    children: (
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to the Application</h1>
        <br />
        <p>
          This is the main content area. You can edit this content and the
          sidebar items using the Storybook controls.
        </p>
      </div>
    ),
    routes: defaultRoutes,
    menu: <Dropdown items={menuItems} name="User" icon={FaUser} />,
  },
};

export default meta;
