import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Breadcrumbs as BreadcrumbsComponent } from "./Breadcrumbs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { BreadcrumbsStoryArgs } from "./Breadcrumbs.types";

const meta: Meta<BreadcrumbsStoryArgs> = {
  title: "Navigation/Breadcrumbs",
  component: BreadcrumbsComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the trail",
    },
    items: { control: "object", description: "Labels and links from the top of the hierarchy to the current page" },
    maxItems: { control: "number", description: "Above this many items, the middle ones collapse behind a button" },
    linkComponent: { control: false, description: "Router link component rendered instead of <a>" },
    labels: { control: "object", description: "Accessible names of the landmark and the expand button" },
    className: { control: "text", description: "Additional classes on the navigation" },
    style: { control: "object", description: "CSS properties on the navigation" },
    listClassName: { control: "text", description: "Additional classes on the list" },
    listStyle: { control: "object", description: "CSS properties on the list" },
    itemClassName: { control: "text", description: "Additional classes on each item" },
    itemStyle: { control: "object", description: "CSS properties on each item" },
    linkClassName: { control: "text", description: "Additional classes on each link" },
    linkStyle: { control: "object", description: "CSS properties on each link" },
    currentClassName: { control: "text", description: "Additional classes on the current page" },
    currentStyle: { control: "object", description: "CSS properties on the current page" },
    expandClassName: { control: "text", description: "Additional classes on the expand button" },
    expandStyle: { control: "object", description: "CSS properties on the expand button" },
  },
};

export const Breadcrumbs: StoryObj<BreadcrumbsStoryArgs> = {
  args: {
    designSystem: "neus",
    items: [
      { label: "Home", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Neus UI", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Members" },
    ],
    maxItems: undefined,
    labels: {},
    className: undefined,
    style: {},
    listClassName: undefined,
    listStyle: {},
    itemClassName: undefined,
    itemStyle: {},
    linkClassName: undefined,
    linkStyle: {},
    currentClassName: undefined,
    currentStyle: {},
    expandClassName: undefined,
    expandStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <BreadcrumbsComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
