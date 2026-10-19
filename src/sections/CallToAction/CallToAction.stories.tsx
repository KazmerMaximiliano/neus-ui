import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button/Button";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { CallToAction as CallToActionComponent } from "./CallToAction";
import type { CallToActionStoryArgs } from "./CallToAction.types";

const PART = (part: string) => ({ control: "text" as const, description: `Additional classes on the ${part}` });
const STYLE = (part: string) => ({ control: "object" as const, description: `CSS properties on the ${part}` });

const meta: Meta<CallToActionStoryArgs> = {
  title: "Sections/CallToAction",
  component: CallToActionComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the band" },
    title: { control: "text", description: "The claim" },
    text: { control: "text", description: "One or two sentences under the title" },
    actions: { control: false, description: "The action; primary buttons swap fill and ink on the brand tone" },
    aside: { control: false, description: "A form or summary beside the text (split)" },
    variant: { control: "select", options: ["band", "split"], description: "band centers; split puts the aside beside the text" },
    titleAs: { control: "select", options: ["h2", "h3"], description: "Heading level of the title" },
    tone: { control: "select", options: ["default", "subtle", "accent", "brand", "inverse"], description: "Band background" },
    spacing: { control: "select", options: ["sm", "md", "lg"], description: "Vertical padding" },
    id: { control: "text", description: "Anchor id, for links such as href=\"#signup\"" },
    className: PART("section"),
    style: STYLE("section"),
    bodyClassName: PART("text column"),
    bodyStyle: STYLE("text column"),
    titleClassName: PART("title"),
    titleStyle: STYLE("title"),
    textClassName: PART("text"),
    textStyle: STYLE("text"),
    actionsClassName: PART("actions"),
    actionsStyle: STYLE("actions"),
    asideClassName: PART("aside"),
    asideStyle: STYLE("aside"),
  },
};

export const CallToAction: StoryObj<CallToActionStoryArgs> = {
  args: {
    designSystem: "neus",
    title: "Your first pause is a minute away",
    text: "Two fields, then your first session.",
    actions: <Button label="Create my account" size="large" href="#signup" />,
    variant: "band",
    titleAs: "h2",
    tone: "brand",
    spacing: "lg",
    id: "signup",
    className: undefined,
    style: {},
    bodyClassName: undefined,
    bodyStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    textClassName: undefined,
    textStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
    asideClassName: undefined,
    asideStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <CallToActionComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
