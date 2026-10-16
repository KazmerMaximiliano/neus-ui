import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { Card } from "../../Card";
import "../../Card.stories.css";
import { CardContent as CardContentComponent } from "./CardContent";
import type { CardContentStoryArgs } from "./CardContent.types";

const meta: Meta<CardContentStoryArgs> = {
  title: "Base/Card/CardContent",
  component: CardContentComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the content",
    },
    children: {
      control: "text",
      description:
        "Free-form content content, including text, JSX, and interactive elements",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on this element",
    },
    style: {
      control: "object",
      description:
        "CSS properties on this element only; null keeps the design-system defaults",
    },
  },
};

export const CardContent: StoryObj<CardContentStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children:
      "Compose text, lists, forms, or any other content inside this section.",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="card-story">
        <Card>
          <CardContentComponent {...args} />
        </Card>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
