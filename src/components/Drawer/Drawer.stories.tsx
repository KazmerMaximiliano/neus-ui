import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Slider } from "../Slider";
import { DrawerContent } from "./components/DrawerContent";
import { DrawerFooter } from "./components/DrawerFooter";
import { DrawerHeader } from "./components/DrawerHeader";
import { Drawer as DrawerComponent } from "./Drawer";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DrawerStoryArgs } from "./Drawer.types";
import "./Drawer.stories.css";

const meta: Meta<DrawerStoryArgs> = {
  title: "Base/Drawer",
  component: DrawerComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the drawer",
    },
    isOpen: { control: "boolean", description: "Shows the modal drawer" },
    side: {
      control: "select",
      options: ["start", "end", "top", "bottom"],
      description: "The edge it slides from; start and end follow the writing direction",
    },
    children: {
      control: false,
      description: "Composition of DrawerHeader, DrawerContent, DrawerFooter or free content",
    },
    className: { control: "text", description: "Additional CSS classes on the dialog" },
    style: {
      control: "object",
      description: "CSS properties on the dialog; null keeps the design-system defaults",
    },
    onClose: { action: "closed", description: "Requested by Escape and backdrop clicks" },
  },
};

export const Drawer: StoryObj<DrawerStoryArgs> = {
  args: {
    designSystem: "neus",
    isOpen: false,
    side: "end",
    className: "",
    style: null,
  },
  render: function Render({ designSystem, onClose, ...args }) {
    const [, updateArgs] = useArgs<DrawerStoryArgs>();
    const close = () => {
      updateArgs({ isOpen: false });
      onClose?.();
    };
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <Button label="Filters" variant="outlined" onClick={() => updateArgs({ isOpen: true })} />
        <DrawerComponent {...args} onClose={close}>
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerContent>
            <div className="drawer-story-filters">
              <Checkbox label="In stock" />
              <Checkbox label="Free shipping" />
              <Slider
                label="Price"
                range
                max={500}
                step={10}
                defaultValue={[50, 300]}
                formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
                labels={{ minimum: "Minimum price", maximum: "Maximum price" }}
              />
            </div>
          </DrawerContent>
          <DrawerFooter>
            <Button label="Clear" variant="outlined" onClick={close} />
            <Button label="Show results" onClick={close} />
          </DrawerFooter>
        </DrawerComponent>
      </ThemeProvider>
    );
  },
};

export default meta;
