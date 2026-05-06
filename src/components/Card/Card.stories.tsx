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
      description: "Free-form body content (rendered below slots).",
    },
    avatarImage: {
      control: "text",
      description: "URL of the avatar image.",
    },
    avatarAlt: {
      control: "text",
      description: "Alt text (or initials fallback) for the avatar.",
    },
    leading: {
      control: false,
      description: "Header leading slot (title, icon, etc.).",
    },
    trailing: {
      control: false,
      description: "Header trailing slot (actions, status, etc.).",
    },
    fill: {
      control: "boolean",
      description: "Fill background with the selected color.",
    },
    color: {
      control: "select",
      options: ["purple", "pink", "red", "yellow", "blue", "green"],
      description: "Decorative color palette (requires fill=true for background).",
    },
    icon: {
      control: false,
      description: "Icon slot rendered above title and description.",
    },
    title: {
      control: "text",
      description: "Optional title slot rendered inside the card.",
    },
    description: {
      control: "text",
      description: "Optional description slot rendered below title.",
    },
    highlighted: {
      control: "boolean",
      description: "Applies primary-color border and tinted background.",
    },
    selected: {
      control: "boolean",
      description: "Applies selected state styling (primary border + tint).",
    },
    disabled: {
      control: "boolean",
      description: "Reduces opacity and blocks interaction.",
    },
    onClick: {
      action: "clicked",
      description: "Makes Card a <button>. Triggers on click when not disabled.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    title: "Titulo",
    description: "Descripcion",
    avatarAlt: "",
    highlighted: false,
    selected: false,
    disabled: false,
    fill: false,
    color: "purple",
  },
};
