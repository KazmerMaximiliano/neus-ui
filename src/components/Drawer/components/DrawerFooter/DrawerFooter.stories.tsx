import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { DrawerFooter as DrawerFooterComponent } from "./DrawerFooter";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DrawerFooterStoryArgs } from "./DrawerFooter.types";
import "../../Drawer.stories.css";

const meta: Meta<DrawerFooterStoryArgs> = {
  title: "Base/Drawer/DrawerFooter",
  component: DrawerFooterComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the part",
    },
    children: { control: "text", description: "Actions at the end of the drawer" },
    className: { control: "text", description: "Additional CSS classes on this element" },
    style: {
      control: "object",
      description: "CSS properties on this element only; null keeps the design-system defaults",
    },
  },
};

export const DrawerFooter: StoryObj<DrawerFooterStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "Footer actions",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="drawer drawer-story">
        <DrawerFooterComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
