import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Avatar as AvatarComponent } from "./Avatar";
import type { AvatarStoryArgs } from "./Avatar.types";

const meta: Meta<AvatarStoryArgs> = {
  title: "Content/Avatar",
  component: AvatarComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the avatar",
    },
    name: { control: "text", description: "Person or organization; gives the initials and the accessible name" },
    src: { control: "text", description: "Picture; initials show while it is missing or when it fails" },
    alt: { control: "text", description: "Accessible name; \"\" when the name is written beside the avatar" },
    size: { control: "select", options: ["small", "medium", "large"], description: "Size; defaults to the group's, then medium" },
    shape: { control: "select", options: [undefined, "circle", "rounded"], description: "Overrides the system's shape" },
    className: { control: "text", description: "Additional classes on the avatar" },
    style: { control: "object", description: "CSS properties on the avatar" },
    imageClassName: { control: "text", description: "Additional classes on the picture" },
    imageStyle: { control: "object", description: "CSS properties on the picture" },
    initialsClassName: { control: "text", description: "Additional classes on the initials" },
    initialsStyle: { control: "object", description: "CSS properties on the initials" },
  },
};

export const Avatar: StoryObj<AvatarStoryArgs> = {
  args: {
    designSystem: "neus",
    name: "Lucía Ferreyra",
    src: undefined,
    alt: undefined,
    size: "large",
    shape: undefined,
    className: undefined,
    style: {},
    imageClassName: undefined,
    imageStyle: {},
    initialsClassName: undefined,
    initialsStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <AvatarComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
