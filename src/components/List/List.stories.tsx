import { Bell, CreditCard, Shield } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Badge } from "../Badge";
import { Switch } from "../Switch";
import { ListItem } from "./components/ListItem";
import { List as ListComponent } from "./List";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ListStoryArgs } from "./List.types";
import "./List.stories.css";

const meta: Meta<ListStoryArgs> = {
  title: "Base/List",
  component: ListComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the list",
    },
    as: { control: "select", options: ["ul", "ol"], description: "Unordered, or ordered when the order matters" },
    divided: { control: "boolean", description: "Rules between the rows instead of space" },
    children: { control: false, description: "The ListItem rows" },
    className: { control: "text", description: "Additional classes on the list" },
    style: { control: "object", description: "CSS properties on the list" },
  },
};

export const List: StoryObj<ListStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "ul",
    divided: true,
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="list-story">
        <ListComponent {...args} aria-label="Settings">
          <ListItem
            leading={<Bell aria-hidden />}
            title="Notifications"
            description="A summary of the week, every Monday."
            trailing={<Switch aria-label="Notifications" defaultChecked />}
          />
          <ListItem
            leading={<Shield aria-hidden />}
            title="Two-step sign-in"
            description="Asks for a code on new devices."
            trailing={<Badge label="On" color="success" />}
          />
          <ListItem leading={<CreditCard aria-hidden />} title="Billing" trailing="Monthly" />
        </ListComponent>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
