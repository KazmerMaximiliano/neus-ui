import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { FAQ as FAQComponent } from "./FAQ";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FAQStoryArgs } from "./FAQ.types";

const meta: Meta<FAQStoryArgs> = {
  title: "Sections/FAQ",
  component: FAQComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the questions" },
    items: { control: "object", description: "Questions and their answers" },
    variant: { control: "select", options: ["list", "cards"], description: "list: questions over dividers; cards: each question a card" },
    single: { control: "boolean", description: "One answer open at a time" },
    questionAs: { control: "select", options: ["h2", "h3", "h4", "h5", "h6"], description: "Heading level of each question" },
    className: { control: "text", description: "Additional classes on the list" },
    style: { control: "object", description: "CSS properties on the list" },
    itemClassName: { control: "text", description: "Additional classes on each item" },
    itemStyle: { control: "object", description: "CSS properties on each item" },
    questionClassName: { control: "text", description: "Additional classes on each question" },
    questionStyle: { control: "object", description: "CSS properties on each question" },
    answerClassName: { control: "text", description: "Additional classes on each answer" },
    answerStyle: { control: "object", description: "CSS properties on each answer" },
  },
};

export const FAQ: StoryObj<FAQStoryArgs> = {
  args: {
    designSystem: "neus",
    items: [
      { question: "Do I need an appointment?", answer: "For check-ups, yes. Emergencies are seen at any time during opening hours." },
      { question: "Which pets do you treat?", answer: "Dogs, cats, rabbits and small rodents." },
      { question: "How do I pay?", answer: "Cash, debit or credit card, and bank transfer." },
    ],
    variant: "list",
    single: false,
    questionAs: "h3",
    className: undefined,
    style: {},
    itemClassName: undefined,
    itemStyle: {},
    questionClassName: undefined,
    questionStyle: {},
    answerClassName: undefined,
    answerStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <FAQComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
