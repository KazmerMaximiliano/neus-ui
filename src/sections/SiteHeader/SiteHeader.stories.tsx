import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button/Button";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { SiteHeader as SiteHeaderComponent } from "./SiteHeader";
import type { SiteHeaderStoryArgs } from "./SiteHeader.types";

const PART = (part: string) => ({ control: "text" as const, description: `Additional classes on the ${part}` });
const STYLE = (part: string) => ({ control: "object" as const, description: `CSS properties on the ${part}` });

const meta: Meta<SiteHeaderStoryArgs> = {
  title: "Sections/SiteHeader",
  component: SiteHeaderComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the header" },
    brand: { control: "text", description: "Logo or name, linked to brandHref" },
    brandHref: { control: "text", description: "Destination of the brand link" },
    links: { control: "object", description: "Navigation links: { label, href, active }" },
    actions: { control: false, description: "Buttons at the end, such as the primary call to action" },
    variant: { control: "select", options: ["plain", "sticky"], description: "sticky keeps the header at the top while scrolling" },
    skipLinkTarget: { control: "text", description: "Renders a skip link to this target, visible on focus" },
    labels: { control: "object", description: "navigation, menu and skipLink texts in the project's language" },
    linkComponent: { control: false, description: "Router link component rendered instead of <a>" },
    className: PART("header"),
    style: STYLE("header"),
    innerClassName: PART("inner Container"),
    innerStyle: STYLE("inner Container"),
    brandClassName: PART("brand link"),
    brandStyle: STYLE("brand link"),
    menuClassName: PART("menu (inline bar from 768px, popover on phones)"),
    menuStyle: STYLE("menu"),
    linkClassName: PART("navigation links"),
    linkStyle: STYLE("navigation links"),
    actionsClassName: PART("actions"),
    actionsStyle: STYLE("actions"),
    menuButtonClassName: PART("phone menu button"),
    menuButtonStyle: STYLE("phone menu button"),
    skipLinkClassName: PART("skip link"),
    skipLinkStyle: STYLE("skip link"),
  },
};

export const SiteHeader: StoryObj<SiteHeaderStoryArgs> = {
  args: {
    designSystem: "neus",
    brand: "AuraFlow",
    brandHref: "/",
    links: [{ label: "How it works", href: "#features" }, { label: "Stories", href: "#voices" }],
    actions: <Button label="Create my account" href="#signup" variant="outlined" size="small" />,
    variant: "sticky",
    skipLinkTarget: "#main",
    labels: { navigation: "Main", menu: "Menu", skipLink: "Skip to content" },
    className: undefined,
    style: {},
    innerClassName: undefined,
    innerStyle: {},
    brandClassName: undefined,
    brandStyle: {},
    menuClassName: undefined,
    menuStyle: {},
    linkClassName: undefined,
    linkStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
    menuButtonClassName: undefined,
    menuButtonStyle: {},
    skipLinkClassName: undefined,
    skipLinkStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <SiteHeaderComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
