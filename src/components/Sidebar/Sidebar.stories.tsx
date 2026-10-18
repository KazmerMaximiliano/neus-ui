import type { Meta, StoryObj } from "@storybook/react";
import { Files, House, LogOut, Settings, User } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Sidebar as SidebarComponent } from "./Sidebar";
import "../../templates/AppTemplate/AppTemplate.styles.css";
import "./Sidebar.stories.css";
import type { SidebarStoryArgs } from "./Sidebar.types";

const meta: Meta<SidebarStoryArgs> = {
  title: "Navigation/Sidebar",
  component: SidebarComponent,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    closeIconClassName: {
      control: "text",
      description: "Customization for closeIcon",
    },
    closeIconStyle: {
      control: "object",
      description: "Customization for closeIcon",
    },
    toggleIconClassName: {
      control: "text",
      description: "Customization for toggleIcon",
    },
    toggleIconStyle: {
      control: "object",
      description: "Customization for toggleIcon",
    },
    avatarClassName: {
      control: "text",
      description: "Additional classes for avatar",
    },
    avatarStyle: {
      control: "object",
      description: "Style override for avatar",
    },
    bodyClassName: {
      control: "text",
      description: "Additional classes for body",
    },
    closeButtonClassName: {
      control: "text",
      description: "Additional classes for closeButton",
    },
    dialogClassName: {
      control: "text",
      description: "Additional classes for dialog",
    },
    dialogStyle: {
      control: "object",
      description: "Style override for dialog",
    },
    headerClassName: {
      control: "text",
      description: "Additional classes for header",
    },
    headerInnerClassName: {
      control: "text",
      description: "Additional classes for headerInner",
    },
    headerInnerStyle: {
      control: "object",
      description: "Style override for headerInner",
    },
    iconClassName: {
      control: "text",
      description: "Additional classes for icon",
    },
    itemClassName: {
      control: "text",
      description: "Additional classes for item",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes for label",
    },
    panelClassName: {
      control: "text",
      description: "Additional classes for panel",
    },
    panelStyle: { control: "object", description: "Style override for panel" },
    titleClassName: {
      control: "text",
      description: "Additional classes for title",
    },
    toggleClassName: {
      control: "text",
      description: "Additional classes for toggle",
    },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description:
        "Local design system; light/dark is inherited from the toolbar",
    },
    background: {
      control: "select",
      options: ["theme", "solid", "gradient", "image"],
      description: "Page background demonstrating the transparent Neus curves",
    },
    items: {
      control: "object",
      description:
        "Navigation items with optional icons, href (renders a link), onClick, active and visible flags",
    },
    linkComponent: {
      control: false,
      description: "Router link component (for example Next.js Link) rendered for items with href instead of <a>",
    },
    title: {
      control: "text",
      description:
        "App name: full title on desktop, avatar initial in narrow layouts",
    },
    children: {
      control: false,
      description:
        "Custom non-interactive branding in the header/avatar; replaces the default title or initial",
    },
    className: {
      control: "text",
      description: "Additional classes on the Sidebar root",
    },
    labels: {
      control: "object",
      description:
        "Accessible names for navigation, open, close, expand and collapse",
    },
    sidebarStyle: {
      control: "object",
      description:
        "Styles on the root, including inherited CSS token overrides",
    },
    headerStyle: { control: "object", description: "Styles on the header" },
    titleStyle: { control: "object", description: "Styles on the title" },
    bodyStyle: {
      control: "object",
      description: "Styles on the scrollable navigation",
    },
    itemStyle: {
      control: "object",
      description: "Styles applied to every navigation button",
    },
    iconStyle: {
      control: "object",
      description: "Styles applied to every icon or initial",
    },
    labelStyle: {
      control: "object",
      description: "Styles applied to every item label",
    },
    toggleStyle: {
      control: "object",
      description: "Styles on the mobile opener or tablet expansion control",
    },
    closeButtonStyle: {
      control: "object",
      description: "Styles on the mobile close button",
    },
  },
};

export const Sidebar: StoryObj<SidebarStoryArgs> = {
  args: {
    closeIconClassName: undefined,
    closeIconStyle: undefined,
    toggleIconClassName: undefined,
    toggleIconStyle: undefined,
    avatarClassName: undefined,
    avatarStyle: undefined,
    bodyClassName: undefined,
    closeButtonClassName: undefined,
    dialogClassName: undefined,
    dialogStyle: undefined,
    headerClassName: undefined,
    headerInnerClassName: undefined,
    headerInnerStyle: undefined,
    iconClassName: undefined,
    itemClassName: undefined,
    labelClassName: undefined,
    panelClassName: undefined,
    panelStyle: undefined,
    titleClassName: undefined,
    toggleClassName: undefined,
    designSystem: "neus",
    background: "theme",
    title: "Navigation",
    children: undefined,
    className: "",
    labels: {
      navigation: "Navegación principal",
      open: "Abrir menú",
      close: "Cerrar menú",
      expand: "Expandir navegación",
      collapse: "Contraer navegación",
    },
    sidebarStyle: undefined,
    headerStyle: undefined,
    titleStyle: undefined,
    bodyStyle: undefined,
    itemStyle: undefined,
    iconStyle: undefined,
    labelStyle: undefined,
    toggleStyle: undefined,
    closeButtonStyle: undefined,
    linkComponent: undefined,
    items: [
      { label: "Dashboard", icon: House, active: true },
      { label: "Profile", icon: User },
      { label: "Documents", icon: Files },
      { label: "Settings", icon: Settings },
      { label: "Help", href: "#help" },
      { label: "Logout", icon: LogOut },
    ],
  },
  render: ({ designSystem, background, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className={`sidebar-story sidebar-story--${background}`}>
        <div className="app-template">
          <SidebarComponent {...args} />
          <main className="app-template__content">
            <div className="app-template__content-container">
              <h1>Responsive navigation</h1>
              <p>
                Resize the viewport: floating menu below 768px, compact rail up
                to 1023px, full sidebar from 1024px.
              </p>
              <p>
                Change the page background to inspect the transparent curves.
                Every design is rendered by the same component.
              </p>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
