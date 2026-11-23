import { Inbox } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button";
import { EmptyState as EmptyStateComponent } from "./EmptyState";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { EmptyStateStoryArgs } from "./EmptyState.types";
import "./EmptyState.stories.css";

const meta: Meta<EmptyStateStoryArgs> = {
  title: "Feedback/EmptyState",
  component: EmptyStateComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the empty state",
    },
    title: { control: "text", description: "What is missing, in a few words" },
    titleAs: { control: "select", options: ["h2", "h3", "h4", "p"], description: "The title's element" },
    description: { control: "text", description: "Why it is empty, or what appears here" },
    media: { control: false, description: "An icon or illustration above the title" },
    actions: { control: false, description: "The way forward: one Button, or a primary and a secondary" },
    className: { control: "text", description: "Additional classes on the empty state" },
    style: { control: "object", description: "CSS properties on the empty state" },
    mediaClassName: { control: "text", description: "Additional classes on the media" },
    mediaStyle: { control: "object", description: "CSS properties on the media" },
    titleClassName: { control: "text", description: "Additional classes on the title" },
    titleStyle: { control: "object", description: "CSS properties on the title" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    actionsClassName: { control: "text", description: "Additional classes on the actions" },
    actionsStyle: { control: "object", description: "CSS properties on the actions" },
  },
};

export const EmptyState: StoryObj<EmptyStateStoryArgs> = {
  args: {
    designSystem: "neus",
    title: "No messages yet",
    titleAs: "h2",
    description: "Messages from your customers appear here as soon as they write.",
    media: <Inbox aria-hidden />,
    actions: (
      <>
        <Button label="Invite customers" />
        <Button label="Read the guide" variant="text" />
      </>
    ),
    className: undefined,
    style: {},
    mediaClassName: undefined,
    mediaStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    actionsClassName: undefined,
    actionsStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="empty-state-story">
        <EmptyStateComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
