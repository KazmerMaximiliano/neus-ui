import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { Avatar } from "../../Avatar";
import { AvatarGroup as AvatarGroupComponent } from "./AvatarGroup";
import type { AvatarGroupStoryArgs } from "./AvatarGroup.types";

const TEAM = ["Valeria Ruiz", "Martín Acosta", "Lucía Benítez", "Tomás Herrera", "Camila Suárez"];

const meta: Meta<AvatarGroupStoryArgs> = {
  title: "Content/AvatarGroup",
  component: AvatarGroupComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the group",
    },
    max: { control: "number", description: "Avatars shown before the +N count" },
    size: { control: "select", options: ["small", "medium", "large"], description: "Size of every avatar" },
    moreLabel: { control: false, description: "Text of the count and its accessible name; defaults to +N" },
    children: { control: false, description: "Avatar elements, in order of importance" },
    "aria-label": { control: "text", description: "Accessible name of the group" },
    className: { control: "text", description: "Additional classes on the group" },
    style: { control: "object", description: "CSS properties on the group" },
    moreClassName: { control: "text", description: "Additional classes on the count" },
    moreStyle: { control: "object", description: "CSS properties on the count" },
  },
};

export const AvatarGroup: StoryObj<AvatarGroupStoryArgs> = {
  args: {
    designSystem: "neus",
    max: 3,
    size: "medium",
    "aria-label": "Team",
    children: TEAM.map((name) => <Avatar key={name} name={name} />),
    className: undefined,
    style: {},
    moreClassName: undefined,
    moreStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <AvatarGroupComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
