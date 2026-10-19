import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../../../components/Avatar/Avatar";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { Testimonial as TestimonialComponent } from "./Testimonial";
import type { TestimonialStoryArgs } from "./Testimonial.types";

const meta: Meta<TestimonialStoryArgs> = {
  title: "Sections/Testimonial",
  component: TestimonialComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the quote" },
    quote: { control: "text", description: "The words, without quotation marks" },
    name: { control: "text", description: "Author" },
    role: { control: "text", description: "Role, company or relation" },
    avatar: { control: false, description: "An Avatar with alt=\"\"" },
    variant: { control: "select", options: ["plain", "card", "featured"], description: "Variant outside a TestimonialList" },
    className: { control: "text", description: "Additional classes on the testimonial" },
    style: { control: "object", description: "CSS properties on the testimonial" },
    quoteClassName: { control: "text", description: "Additional classes on the quote" },
    quoteStyle: { control: "object", description: "CSS properties on the quote" },
    captionClassName: { control: "text", description: "Additional classes on the caption" },
    captionStyle: { control: "object", description: "CSS properties on the caption" },
    nameClassName: { control: "text", description: "Additional classes on the name" },
    nameStyle: { control: "object", description: "CSS properties on the name" },
    roleClassName: { control: "text", description: "Additional classes on the role" },
    roleStyle: { control: "object", description: "CSS properties on the role" },
  },
};

export const Testimonial: StoryObj<TestimonialStoryArgs> = {
  args: {
    designSystem: "neus",
    quote: "I open it in the lift before the daily and walk into the meeting without the knot in my chest.",
    name: "Lucía Ferreyra",
    role: "Product designer",
    avatar: <Avatar name="Lucía Ferreyra" alt="" />,
    variant: "card",
    className: undefined,
    style: { maxWidth: 420 },
    quoteClassName: undefined,
    quoteStyle: {},
    captionClassName: undefined,
    captionStyle: {},
    nameClassName: undefined,
    nameStyle: {},
    roleClassName: undefined,
    roleStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <TestimonialComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
