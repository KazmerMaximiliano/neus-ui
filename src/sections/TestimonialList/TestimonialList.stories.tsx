import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../components/Avatar/Avatar";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Testimonial } from "./components/Testimonial/Testimonial";
import { TestimonialList as TestimonialListComponent } from "./TestimonialList";
import type { TestimonialListStoryArgs } from "./TestimonialList.types";

const QUOTES = [
  { quote: "I open it in the lift before the daily.", name: "Lucía Ferreyra", role: "Product designer" },
  { quote: "I wrote that I could not sleep. It gave me five minutes for exactly that.", name: "Martín Ibarra", role: "Financial analyst" },
  { quote: "Saying how I feel in one line is easier than picking from a hundred audios.", name: "Carla Benítez", role: "Backend developer" },
];

const meta: Meta<TestimonialListStoryArgs> = {
  title: "Sections/TestimonialList",
  component: TestimonialListComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the list" },
    variant: { control: "select", options: ["plain", "card", "featured"], description: "plain: running text; card: each quote a Card; featured: the first quote large" },
    columns: { control: "number", description: "Columns; in code also { base, md, lg }" },
    children: { control: false, description: "Testimonial elements" },
    "aria-label": { control: "text", description: "Accessible name of the list, when no heading names its section" },
    className: { control: "text", description: "Additional classes on the list" },
    style: { control: "object", description: "CSS properties on the list" },
  },
};

export const TestimonialList: StoryObj<TestimonialListStoryArgs> = {
  args: {
    designSystem: "neus",
    variant: "card",
    columns: undefined,
    children: QUOTES.map(({ quote, name, role }) => (
      <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
    )),
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <TestimonialListComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
