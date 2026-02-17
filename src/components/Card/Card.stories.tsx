import { Meta, StoryObj } from "@storybook/react";
import { Card as CardComponent } from "./Card";

const meta: Meta<typeof CardComponent> = {
  title: "Components/Card",
  component: CardComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description:
        "The main content of the card, which can be any React node (text, elements, etc.)",
    },
    avatarImage: {
      control: "text",
      description: "URL of the avatar image to display in the card.",
    },
    avatarAlt: {
      control: "text",
      description:
        "Alternative text for the avatar image, used for accessibility.",
    },
    leading: {
      control: false,
      description:
        "Content to display in the leading section of the card header (e.g., title, icon).",
    },
    trailing: {
      control: false,
      description:
        "Content to display in the trailing section of the card header (e.g., action buttons, status).",
    },
    fill: {
      control: "boolean",
      description:
        "If true, the card will take up the full width of its container.",
    },
    color: {
      control: "select",
      options: ["purple", "pink", "red", "yellow", "blue", "green"],
      description: "The color theme of the card.",
    },
  },
};

type Story = StoryObj<typeof meta>;

const CardContent = () => (
  <div>
    <p>This is a card component. You can put any content here.</p>
    <p>It supports text, images, and other React elements.</p>
  </div>
);

export const Card: Story = {
  args: {
    children: <CardContent />,
    avatarAlt: "Username",
    leading: <h3>Card Title</h3>,
    trailing: <span>Trailing Info</span>,
    fill: true,
    color: "blue",
  },
};

export default meta;
