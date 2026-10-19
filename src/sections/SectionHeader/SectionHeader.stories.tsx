import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { SectionHeader as SectionHeaderComponent } from "./SectionHeader";
import type { SectionHeaderStoryArgs } from "./SectionHeader.types";

const PART = (part: string) => ({ control: "text" as const, description: `Additional classes on the ${part}` });
const STYLE = (part: string) => ({ control: "object" as const, description: `CSS properties on the ${part}` });

const meta: Meta<SectionHeaderStoryArgs> = {
  title: "Sections/SectionHeader",
  component: SectionHeaderComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the header" },
    title: { control: "text", description: "Section title" },
    eyebrow: { control: "text", description: "Short label above the title, when the system allows overlines" },
    description: { control: "text", description: "One sentence under the title" },
    actions: { control: false, description: "A link or button beside the title" },
    align: { control: "select", options: ["start", "center"], description: "Alignment" },
    titleAs: { control: "select", options: ["h2", "h3"], description: "Heading level of the title" },
    titleId: { control: "text", description: "id of the heading, for aria-labelledby on the Section" },
    className: PART("header"),
    style: STYLE("header"),
    eyebrowClassName: PART("eyebrow"),
    eyebrowStyle: STYLE("eyebrow"),
    titleClassName: PART("title"),
    titleStyle: STYLE("title"),
    descriptionClassName: PART("description"),
    descriptionStyle: STYLE("description"),
    actionsClassName: PART("actions"),
    actionsStyle: STYLE("actions"),
  },
};

export const SectionHeader: StoryObj<SectionHeaderStoryArgs> = {
  args: {
    designSystem: "neus",
    title: "Two days, two tracks",
    eyebrow: "Agenda",
    description: "Friday is platform and performance; Saturday, design, product and craft.",
    align: "start",
    titleAs: "h2",
    titleId: "agenda-title",
    className: undefined,
    style: {},
    eyebrowClassName: undefined,
    eyebrowStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <SectionHeaderComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
