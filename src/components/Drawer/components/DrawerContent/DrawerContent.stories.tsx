import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { DrawerContent as DrawerContentComponent } from "./DrawerContent";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DrawerContentStoryArgs } from "./DrawerContent.types";
import "../../Drawer.stories.css";

const meta: Meta<DrawerContentStoryArgs> = {
  title: "Base/Drawer/DrawerContent",
  component: DrawerContentComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the part",
    },
    children: { control: "text", description: "Body content; it scrolls between the header and the footer" },
    className: { control: "text", description: "Additional CSS classes on this element" },
    style: {
      control: "object",
      description: "CSS properties on this element only; null keeps the design-system defaults",
    },
  },
};

export const DrawerContent: StoryObj<DrawerContentStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "Pick the categories and the price range to show.",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="drawer drawer-story">
        <DrawerContentComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
