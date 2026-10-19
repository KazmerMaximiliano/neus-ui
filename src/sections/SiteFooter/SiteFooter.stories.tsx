import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { SiteFooter as SiteFooterComponent } from "./SiteFooter";
import type { SiteFooterStoryArgs } from "./SiteFooter.types";

const PART = (part: string) => ({ control: "text" as const, description: `Additional classes on the ${part}` });
const STYLE = (part: string) => ({ control: "object" as const, description: `CSS properties on the ${part}` });

const meta: Meta<SiteFooterStoryArgs> = {
  title: "Sections/SiteFooter",
  component: SiteFooterComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the footer" },
    brand: { control: "text", description: "Logo or name" },
    columns: { control: "object", description: "Columns of links: { title, links: { label, href }[] }" },
    legal: { control: "text", description: "Copyright, address, legal links" },
    linkComponent: { control: false, description: "Router link component rendered instead of <a>" },
    className: PART("footer"),
    style: STYLE("footer"),
    innerClassName: PART("inner Container"),
    innerStyle: STYLE("inner Container"),
    brandClassName: PART("brand"),
    brandStyle: STYLE("brand"),
    columnClassName: PART("columns"),
    columnStyle: STYLE("columns"),
    columnTitleClassName: PART("column titles"),
    columnTitleStyle: STYLE("column titles"),
    linkClassName: PART("links"),
    linkStyle: STYLE("links"),
    legalClassName: PART("legal line"),
    legalStyle: STYLE("legal line"),
  },
};

export const SiteFooter: StoryObj<SiteFooterStoryArgs> = {
  args: {
    designSystem: "neus",
    brand: "Veterinaria Los Aromos",
    columns: [
      { title: "Clinic", links: [{ label: "Services", href: "#services" }, { label: "Team", href: "#team" }] },
      { title: "Visit", links: [{ label: "Book a visit", href: "#booking" }, { label: "How to get here", href: "#location" }] },
    ],
    legal: "Bv. Oroño 1450, Rosario · Mon–Fri 9–20 h, Sat 9–13 h",
    className: undefined,
    style: {},
    innerClassName: undefined,
    innerStyle: {},
    brandClassName: undefined,
    brandStyle: {},
    columnClassName: undefined,
    columnStyle: {},
    columnTitleClassName: undefined,
    columnTitleStyle: {},
    linkClassName: undefined,
    linkStyle: {},
    legalClassName: undefined,
    legalStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <SiteFooterComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
