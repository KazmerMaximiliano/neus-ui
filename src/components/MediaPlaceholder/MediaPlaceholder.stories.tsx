import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { MediaPlaceholder as MediaPlaceholderComponent } from "./MediaPlaceholder";
import type { MediaPlaceholderStoryArgs } from "./MediaPlaceholder.types";

const meta: Meta<MediaPlaceholderStoryArgs> = {
  title: "Content/MediaPlaceholder",
  component: MediaPlaceholderComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the placeholder",
    },
    label: {
      control: "text",
      description: "What the real picture will show; also its accessible name",
    },
    ratio: {
      control: "select",
      options: ["4 / 3", "1 / 1", "3 / 4", "16 / 9", "21 / 9"],
      description: "CSS aspect ratio of the frame",
    },
    className: {
      control: "text",
      description: "Additional classes on the frame",
    },
    style: {
      control: "object",
      description: "CSS properties on the frame, merged after the ratio",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes on the label",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties on the label",
    },
  },
};

export const MediaPlaceholder: StoryObj<MediaPlaceholderStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Vet examining a dog in the consulting room",
    ratio: "4 / 3",
    className: undefined,
    style: { maxWidth: 480 },
    labelClassName: undefined,
    labelStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <MediaPlaceholderComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
