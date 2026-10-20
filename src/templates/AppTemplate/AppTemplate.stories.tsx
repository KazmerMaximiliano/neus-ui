import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";
import { designSystemControl, withDesignSystem } from "../../../.storybook/designSystem";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { AppTemplate as AppTemplateComponent } from "./AppTemplate";
import type { DesignSystemPreviewArgs } from "../../../.storybook/designSystem.types";
import type { AppTemplateProps } from "./AppTemplate.types";
import { DEFAULT_ROUTES, MENU_ITEMS } from "../../../.storybook/fixtures/AppTemplate.consts";

const meta: Meta<AppTemplateProps & DesignSystemPreviewArgs> = {
  title: "Templates/AppTemplate",
  component: AppTemplateComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [withDesignSystem],
  argTypes: {
    sidebarContainerClassName: { control: "text", description: "Additional CSS classes for sidebar container" },
    sidebarContainerStyle: { control: "object", description: "Inline CSS override for sidebar container" },
    designSystem: designSystemControl,
    contentClassName: { control: "text", description: "Additional classes for content" },
    contentContainerClassName: { control: "text", description: "Additional classes for contentContainer" },
    headerClassName: { control: "text", description: "Additional classes for header" },
    sidebarClassName: { control: "text", description: "Additional classes for sidebar" },
    title: { control: "text", description: "title override" },
    className: { control: "text", description: "className override" },
    style: { control: "object", description: "style override" },
    headerStyle: { control: "object", description: "headerStyle override" },
    sidebarStyle: { control: "object", description: "sidebarStyle override" },
    contentStyle: { control: "object", description: "contentStyle override" },
    contentContainerStyle: { control: "object", description: "contentContainerStyle override" },

    children: {
      control: false,
      description: "Content to display in the main area",
      defaultValue: "Main content area",
    },
    routes: {
      control: "object",
      description: "Sidebar navigation items; an item with href renders a link",
    },
    linkComponent: {
      control: false,
      description: "Router link component (for example Next.js Link) passed to Sidebar for routes with href",
    },
    menu: {
      control: false,
      description: "Global actions at the end of the header: user menu, notifications",
    },
    headerStart: {
      control: false,
      description: "Context at the start of the header: breadcrumb, workspace, search",
    },
    headerStartClassName: { control: "text", description: "Additional classes on the header start" },
    headerStartStyle: { control: "object", description: "Inline styles on the header start" },
  },
};

type Story = StoryObj<typeof meta>;





export const AppTemplate: Story = {
  args: {
    sidebarContainerClassName: undefined,
    sidebarContainerStyle: undefined,
    designSystem: "global",
    contentClassName: undefined,
    contentContainerClassName: undefined,
    headerClassName: undefined,
    sidebarClassName: undefined,
    title: undefined,
    className: undefined,
    style: {},
    headerStyle: {},
    sidebarStyle: {},
    contentStyle: {},
    contentContainerStyle: {},

    children: (
      <div>
        <h1>Welcome to the Application</h1>
        <br />
        <p>
          This is the main content area. You can edit this content and the
          sidebar items using the Storybook controls.
        </p>
      </div>
    ),
    routes: DEFAULT_ROUTES,
    linkComponent: undefined,
    menu: <Dropdown items={MENU_ITEMS} name="User" icon={User} />,
    headerStart: undefined,
    headerStartClassName: undefined,
    headerStartStyle: undefined,
  },
};

export default meta;
