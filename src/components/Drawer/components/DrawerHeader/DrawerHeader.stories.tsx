import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { DrawerHeader as DrawerHeaderComponent } from "./DrawerHeader";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DrawerHeaderStoryArgs } from "./DrawerHeader.types";
import "../../Drawer.stories.css";

const meta: Meta<DrawerHeaderStoryArgs> = {
  title: "Base/Drawer/DrawerHeader",
  component: DrawerHeaderComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the part",
    },
    children: { control: "text", description: "Header content; it names the drawer" },
    className: { control: "text", description: "Additional CSS classes on this element" },
    style: {
      control: "object",
      description: "CSS properties on this element only; null keeps the design-system defaults",
    },
  },
};

export const DrawerHeader: StoryObj<DrawerHeaderStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "Filters",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="drawer drawer-story">
        <DrawerHeaderComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
