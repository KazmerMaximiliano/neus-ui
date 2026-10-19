import type { Meta, StoryObj } from "@storybook/react";
import { CalendarClock, MessageSquareText, SlidersHorizontal } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { FeatureItem } from "./components/FeatureItem/FeatureItem";
import { FeatureList as FeatureListComponent } from "./FeatureList";
import type { FeatureListStoryArgs } from "./FeatureList.types";

const meta: Meta<FeatureListStoryArgs> = {
  title: "Sections/FeatureList",
  component: FeatureListComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the list" },
    variant: { control: "select", options: ["grid", "list", "cards"], description: "grid: plain blocks; list: rows; cards: each item a Card" },
    columns: { control: "number", description: "Columns of grid and cards; in code also { base, md, lg }" },
    children: { control: false, description: "FeatureItem elements" },
    "aria-label": { control: "text", description: "Accessible name of the list, when no heading names its section" },
    className: { control: "text", description: "Additional classes on the list" },
    style: { control: "object", description: "CSS properties on the list" },
  },
};

export const FeatureList: StoryObj<FeatureListStoryArgs> = {
  args: {
    designSystem: "neus",
    variant: "cards",
    columns: undefined,
    children: [
      <FeatureItem key="1" icon={<MessageSquareText />} title="Starts from how you arrive">One sentence about how you feel; the session adapts its breathing and length.</FeatureItem>,
      <FeatureItem key="2" icon={<CalendarClock />} title="Fits between two meetings">One to ten minutes, at your desk or on the commute.</FeatureItem>,
      <FeatureItem key="3" icon={<SlidersHorizontal />} title="Learns what works">Rate a session and the next ones follow what helped.</FeatureItem>,
    ],
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <FeatureListComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
