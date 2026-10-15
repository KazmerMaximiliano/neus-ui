import type { Meta, StoryObj } from "@storybook/react";
import { Files, House, LogOut, Settings, User } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import "../../templates/AppTemplate/AppTemplate.styles.css";
import { Sidebar as SidebarComponent } from "./Sidebar";
import "./Sidebar.stories.css";
import type { SidebarStoryArgs } from "./Sidebar.types";

const meta: Meta<SidebarStoryArgs> = {
  title: "Components/Sidebar",
  component: SidebarComponent,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
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
        "Navigation actions with optional icons, active and visible flags",
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
    items: [
      { label: "Dashboard", icon: House, active: true },
      { label: "Profile", icon: User },
      { label: "Documents", icon: Files },
      { label: "Settings", icon: Settings },
      { label: "Help" },
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
