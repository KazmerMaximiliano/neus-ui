import { Bell } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { Switch } from "../../../Switch";
import { List } from "../../List";
import { ListItem as ListItemComponent } from "./ListItem";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ListItemStoryArgs } from "./ListItem.types";
import "../../List.stories.css";

const meta: Meta<ListItemStoryArgs> = {
  title: "Base/List/ListItem",
  component: ListItemComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the row",
    },
    title: { control: "text", description: "The row's main text" },
    description: { control: "text", description: "Secondary text under the title" },
    leading: { control: false, description: "An icon, avatar or picture before the text" },
    trailing: { control: false, description: "Meta text or a control after the text" },
    children: { control: false, description: "More content under the description" },
    className: { control: "text", description: "Additional classes on the row" },
    style: { control: "object", description: "CSS properties on the row" },
    leadingClassName: { control: "text", description: "Additional classes on the leading part" },
    leadingStyle: { control: "object", description: "CSS properties on the leading part" },
    bodyClassName: { control: "text", description: "Additional classes on the text column" },
    bodyStyle: { control: "object", description: "CSS properties on the text column" },
    titleClassName: { control: "text", description: "Additional classes on the title" },
    titleStyle: { control: "object", description: "CSS properties on the title" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    trailingClassName: { control: "text", description: "Additional classes on the trailing part" },
    trailingStyle: { control: "object", description: "CSS properties on the trailing part" },
  },
};

export const ListItem: StoryObj<ListItemStoryArgs> = {
  args: {
    designSystem: "neus",
    title: "Notifications",
    description: "A summary of the week, every Monday.",
    leading: <Bell aria-hidden />,
    trailing: <Switch aria-label="Notifications" defaultChecked />,
    className: undefined,
    style: {},
    leadingClassName: undefined,
    leadingStyle: {},
    bodyClassName: undefined,
    bodyStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    trailingClassName: undefined,
    trailingStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="list-story">
        <List aria-label="Settings">
          <ListItemComponent {...args} />
        </List>
      </div>
    </ThemeProvider>
  ),
};

export default meta;
