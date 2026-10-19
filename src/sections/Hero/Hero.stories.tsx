import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button/Button";
import { MediaPlaceholder } from "../../components/MediaPlaceholder/MediaPlaceholder";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Hero as HeroComponent } from "./Hero";
import type { HeroStoryArgs } from "./Hero.types";

const PART = (part: string) => ({ control: "text" as const, description: `Additional classes on the ${part}` });
const STYLE = (part: string) => ({ control: "object" as const, description: `CSS properties on the ${part}` });

const meta: Meta<HeroStoryArgs> = {
  title: "Sections/Hero",
  component: HeroComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the hero" },
    title: { control: "text", description: "Display headline" },
    eyebrow: { control: "text", description: "Short label above the title, when the system allows overlines" },
    lead: { control: "text", description: "One or two sentences under the title" },
    actions: { control: false, description: "The primary action, and at most one secondary one" },
    note: { control: "text", description: "Microcopy under the actions" },
    media: { control: false, description: "The visual anchor: interface, demo, picture or MediaPlaceholder" },
    variant: { control: "select", options: ["split", "centered", "media-first"], description: "Where the media sits" },
    titleAs: { control: "select", options: ["h1", "h2"], description: "Heading level of the title" },
    tone: { control: "select", options: ["default", "subtle", "accent", "brand", "inverse"], description: "Band background" },
    spacing: { control: "select", options: ["sm", "md", "lg"], description: "Vertical padding" },
    id: { control: "text", description: "Anchor id of the section" },
    className: PART("hero section"),
    style: STYLE("hero section"),
    bodyClassName: PART("text column"),
    bodyStyle: STYLE("text column"),
    eyebrowClassName: PART("eyebrow"),
    eyebrowStyle: STYLE("eyebrow"),
    titleClassName: PART("title"),
    titleStyle: STYLE("title"),
    leadClassName: PART("lead"),
    leadStyle: STYLE("lead"),
    actionsClassName: PART("actions"),
    actionsStyle: STYLE("actions"),
    noteClassName: PART("note"),
    noteStyle: STYLE("note"),
    mediaClassName: PART("media"),
    mediaStyle: STYLE("media"),
  },
};

export const Hero: StoryObj<HeroStoryArgs> = {
  args: {
    designSystem: "neus",
    title: "Your neighbourhood vet on Bv. Oroño",
    eyebrow: "Open today until 8 pm",
    lead: "Check-ups, vaccines, minor surgery and grooming in one place, with time to listen.",
    actions: <Button label="Book a visit" href="#booking" size="large" />,
    note: "We call you back to confirm the time.",
    media: <MediaPlaceholder label="Vet examining a dog in the consulting room" />,
    variant: "split",
    titleAs: "h1",
    tone: "default",
    spacing: "lg",
    id: undefined,
    className: undefined,
    style: {},
    bodyClassName: undefined,
    bodyStyle: {},
    eyebrowClassName: undefined,
    eyebrowStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    leadClassName: undefined,
    leadStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
    noteClassName: undefined,
    noteStyle: {},
    mediaClassName: undefined,
    mediaStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <HeroComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
