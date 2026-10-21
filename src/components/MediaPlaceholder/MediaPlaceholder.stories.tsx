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
      description: "CSS aspect ratio of the frame; also the preview photo's orientation",
    },
    query: {
      control: "text",
      description: "Words for the preview search, in the page's language; defaults to the label",
    },
    pixabayKey: {
      control: "text",
      description: "Pixabay API key; paste one to preview a matching stock photo",
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
    imageClassName: {
      control: "text",
      description: "Additional classes on the preview photo, rendered with a key",
    },
    imageStyle: {
      control: "object",
      description: "CSS properties on the preview photo, rendered with a key",
    },
    creditClassName: {
      control: "text",
      description: "Additional classes on the photo credit, rendered once the photo loads",
    },
    creditStyle: {
      control: "object",
      description: "CSS properties on the photo credit, rendered once the photo loads",
    },
  },
};

export const MediaPlaceholder: StoryObj<MediaPlaceholderStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Vet examining a dog in the consulting room",
    ratio: "4 / 3",
    query: "vet dog",
    pixabayKey: "",
    className: undefined,
    style: { maxWidth: 480 },
    labelClassName: undefined,
    labelStyle: {},
    imageClassName: undefined,
    imageStyle: {},
    creditClassName: undefined,
    creditStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <MediaPlaceholderComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
