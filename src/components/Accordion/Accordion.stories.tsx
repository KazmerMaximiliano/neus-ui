import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Accordion as AccordionComponent } from "./Accordion";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AccordionStoryArgs } from "./Accordion.types";
import "./Accordion.stories.css";

const meta: Meta<AccordionStoryArgs> = {
  title: "Base/Accordion",
  component: AccordionComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the accordion",
    },
    items: { control: "object", description: "Items with their value, title, content and disabled state" },
    type: { control: "select", options: ["single", "multiple"], description: "One open item at a time, or any number" },
    value: { control: "object", description: "The open items (controlled)" },
    defaultValue: { control: false, description: "The items open first (uncontrolled)" },
    titleAs: {
      control: "select",
      options: [undefined, "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level that wraps each title",
    },
    onChange: { action: "changed", description: "Called with the open items" },
    className: { control: "text", description: "Additional classes on the root" },
    style: { control: "object", description: "CSS properties on the root" },
    itemClassName: { control: "text", description: "Additional classes on each item" },
    itemStyle: { control: "object", description: "CSS properties on each item" },
    headerClassName: { control: "text", description: "Additional classes on each header" },
    headerStyle: { control: "object", description: "CSS properties on each header" },
    contentClassName: { control: "text", description: "Additional classes on each content region" },
    contentStyle: { control: "object", description: "CSS properties on each content region" },
  },
};

export const Accordion: StoryObj<AccordionStoryArgs> = {
  args: {
    designSystem: "neus",
    items: [
      { value: "shipping", title: "Shipping", content: "Orders leave the warehouse within two business days." },
      { value: "returns", title: "Returns", content: "Send anything back within 30 days for a full refund." },
      { value: "warranty", title: "Warranty", content: "Every device is covered for two years.", disabled: true },
      { value: "support", title: "Support", content: "Write to us any day; we answer within a day." },
    ],
    type: "multiple",
    value: ["shipping"],
    titleAs: undefined,
    className: undefined,
    style: {},
    itemClassName: undefined,
    itemStyle: {},
    headerClassName: undefined,
    headerStyle: {},
    contentClassName: undefined,
    contentStyle: {},
  },
  render: function Render({ designSystem, onChange, ...args }) {
    const [, updateArgs] = useArgs<AccordionStoryArgs>();
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <div className="accordion-story">
          <AccordionComponent
            {...args}
            onChange={(value) => {
              updateArgs({ value });
              onChange?.(value);
            }}
          />
        </div>
      </ThemeProvider>
    );
  },
};

export default meta;
