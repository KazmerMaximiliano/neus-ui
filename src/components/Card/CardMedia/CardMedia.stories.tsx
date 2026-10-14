import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../design-systems";
import { ThemeProvider } from "../../../providers";
import { Card } from "../Card";
import "../Card.stories.css";
import previewImage from "../Card.stories.svg";
import { CardMedia as CardMediaComponent } from "./CardMedia";
import type { CardMediaStoryArgs } from "./CardMedia.types";

const meta: Meta<CardMediaStoryArgs> = {
  title: "Components/Card/CardMedia",
  component: CardMediaComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the media",
    },
    component: {
      control: "select",
      options: ["img", "video", "audio", "iframe"],
      description:
        "Element to render. The API also accepts custom React components with inferred props.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the media element",
    },
    style: {
      control: "object",
      description: "CSS overrides, including height, aspectRatio and objectFit",
    },
    src: {
      control: "text",
      description:
        "Media URL. Empty uses a local image/iframe example or an unloaded audio/video element.",
    },
    alt: { control: "text", description: "Alternative text for images" },
    title: {
      control: "text",
      description: "Accessible title, especially for embedded frames",
    },
    controls: {
      control: "boolean",
      description: "Show native video or audio controls",
    },
    poster: {
      control: "text",
      description: "Video poster URL; empty uses the local preview image",
    },
    children: {
      control: false,
      description:
        "For supported elements: source, track, fallback content, or a custom player's children",
    },
  },
};

export const CardMedia: StoryObj<typeof meta> = {
  args: {
    designSystem: "neus",
    component: "img",
    className: "",
    style: null,
    src: "",
    alt: "Abstract mountains beneath a golden sun",
    title: "Media preview",
    controls: true,
    poster: "",
    children: undefined,
  },
  render: ({
    designSystem,
    component,
    src,
    alt,
    title,
    controls,
    poster,
    children,
    ...props
  }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="card-story">
        <Card>
          {component === "img" && (
            <CardMediaComponent
              {...props}
              src={src || previewImage}
              alt={alt}
              title={title}
            />
          )}
          {component === "video" && (
            <CardMediaComponent
              {...props}
              component="video"
              src={src || undefined}
              poster={poster || previewImage}
              controls={controls}
              title={title}
            >
              {children}
            </CardMediaComponent>
          )}
          {component === "audio" && (
            <CardMediaComponent
              {...props}
              component="audio"
              src={src || undefined}
              controls={controls}
              title={title}
            >
              {children}
            </CardMediaComponent>
          )}
          {component === "iframe" && (
            <CardMediaComponent
              {...props}
              component="iframe"
              title={title}
              src={src || undefined}
              srcDoc={
                src
                  ? undefined
                  : "<!doctype html><html lang='en'><title>Media preview</title><body><p>Embedded media preview</p></body></html>"
              }
              sandbox=""
            />
          )}
        </Card>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
