import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { Card } from "../../Card";
import "../../Card.stories.css";
import { CardHeader as CardHeaderComponent } from "./CardHeader";
import type { CardHeaderStoryArgs } from "./CardHeader.types";

const meta: Meta<CardHeaderStoryArgs> = {
  title: "Base/Card/CardHeader",
  component: CardHeaderComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the header",
    },
    children: {
      control: "text",
      description:
        "Free-form header content, including text, JSX, and interactive elements",
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

export const CardHeader: StoryObj<CardHeaderStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "A change of scenery",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="card-story">
        <Card>
          <CardHeaderComponent {...args} />
        </Card>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
