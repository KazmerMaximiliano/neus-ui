import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../design-systems";
import { ThemeProvider } from "../../../providers";
import { Button } from "../../Button/Button";
import { Card } from "../Card";
import "../Card.stories.css";
import { CardFooter as CardFooterComponent } from "./CardFooter";
import type { CardFooterStoryArgs } from "./CardFooter.types";

const meta: Meta<CardFooterStoryArgs> = {
  title: "Base/Card/CardFooter",
  component: CardFooterComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the footer",
    },
    children: {
      control: false,
      description:
        "Free-form footer content, including text, JSX, and interactive elements",
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

export const CardFooter: StoryObj<CardFooterStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: (
      <>
        <Button label="Save" />
        <Button label="Cancel" variant="text" />
      </>
    ),
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="card-story">
        <Card>
          <CardFooterComponent {...args} />
        </Card>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
