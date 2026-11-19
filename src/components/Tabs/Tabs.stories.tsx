import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Tabs as TabsComponent } from "./Tabs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TabsStoryArgs } from "./Tabs.types";
import "./Tabs.stories.css";

const meta: Meta<TabsStoryArgs> = {
  title: "Navigation/Tabs",
  component: TabsComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the tabs",
    },
    items: { control: "object", description: "Tabs with their value, label, panel content and disabled state" },
    value: { control: "text", description: "The selected tab (controlled)" },
    defaultValue: { control: false, description: "The tab selected first (uncontrolled)" },
    label: { control: "text", description: "Accessible name of the tab list" },
    variant: { control: "select", options: ["line", "contained"], description: "Tabs over a divider or inside a container" },
    onChange: { action: "changed", description: "Called with the value of the tab chosen" },
    className: { control: "text", description: "Additional classes on the root" },
    style: { control: "object", description: "CSS properties on the root" },
    listClassName: { control: "text", description: "Additional classes on the tab list" },
    listStyle: { control: "object", description: "CSS properties on the tab list" },
    tabClassName: { control: "text", description: "Additional classes on each tab" },
    tabStyle: { control: "object", description: "CSS properties on each tab" },
    panelClassName: { control: "text", description: "Additional classes on each panel" },
    panelStyle: { control: "object", description: "CSS properties on each panel" },
  },
};

export const Tabs: StoryObj<TabsStoryArgs> = {
  args: {
    designSystem: "neus",
    items: [
      { value: "general", label: "General", content: "Name, URL and the project's region." },
      { value: "members", label: "Members", content: "Eight people can edit this project." },
      { value: "billing", label: "Billing", content: "Invoices and the payment method.", disabled: true },
      { value: "integrations", label: "Integrations", content: "Connected repositories and webhooks." },
    ],
    value: "general",
    label: "Project settings",
    variant: "line",
    className: undefined,
    style: {},
    listClassName: undefined,
    listStyle: {},
    tabClassName: undefined,
    tabStyle: {},
    panelClassName: undefined,
    panelStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<TabsStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <div className="tabs-story">
          <TabsComponent
            {...args}
            onChange={(value) => {
              updateArgs({ value });
              onChange?.(value);
            }}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export default meta;
