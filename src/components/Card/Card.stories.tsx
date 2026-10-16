import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button/Button";
import { Card as CardComponent } from "./Card";
import "./Card.stories.css";
import previewImage from "./Card.stories.svg";
import type { CardStoryArgs } from "./Card.types";
import { CardContent } from "./components/CardContent/CardContent";
import { CardFooter } from "./components/CardFooter/CardFooter";
import { CardHeader } from "./components/CardHeader/CardHeader";
import { CardMedia } from "./components/CardMedia/CardMedia";

const meta: Meta<CardStoryArgs> = {
  title: "Base/Card",
  component: CardComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["auto", "filled", "outlined", "elevated"], description: "Surface treatment; auto follows the system" },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the card",
    },
    children: {
      control: false,
      description:
        "Free-form JSX, including any combination of the optional Card subcomponents",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the card container",
    },
    style: {
      control: "object",
      description:
        "CSS properties on this card only; null keeps the design-system defaults",
    },
  },
};

export const Card: StoryObj<CardStoryArgs> = {
  args: {
    designSystem: "neus",
    variant: "auto",
    className: "",
    style: null,
    children: (
      <>
        <CardHeader>
          <h2 className="card-story-heading">A change of scenery</h2>
        </CardHeader>
        <CardMedia
          src={previewImage}
          alt="Abstract mountains beneath a golden sun"
        />
        <CardContent>
          <p>
            Make room for a new perspective. Compose your own content, media,
            and actions.
          </p>
        </CardContent>
        <CardFooter>
          <Button label="Explore" />
          <Button label="Save for later" variant="text" />
        </CardFooter>
      </>
    ),
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="card-story">
        <CardComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
