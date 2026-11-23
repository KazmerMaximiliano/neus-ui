import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button";
import { Text } from "../Text";
import { Separator as SeparatorComponent } from "./Separator";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SeparatorStoryArgs } from "./Separator.types";
import "./Separator.stories.css";

const meta: Meta<SeparatorStoryArgs> = {
  title: "Layout/Separator",
  component: SeparatorComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the separator",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Across the content, or down a row of items",
    },
    decorative: { control: "boolean", description: "Hides the line from assistive technology" },
    className: { control: "text", description: "Additional classes on the line" },
    style: { control: "object", description: "CSS properties on the line" },
  },
};

export const Separator: StoryObj<SeparatorStoryArgs> = {
  args: {
    designSystem: "neus",
    orientation: "horizontal",
    decorative: false,
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className={`separator-story separator-story--${args.orientation}`}>
        {args.orientation === "vertical" ? (
          <>
            <Button label="Edit" variant="text" size="small" />
            <SeparatorComponent {...args} />
            <Button label="Share" variant="text" size="small" />
            <SeparatorComponent {...args} />
            <Button label="Archive" variant="text" size="small" />
          </>
        ) : (
          <>
            <Text>Account settings</Text>
            <SeparatorComponent {...args} />
            <Text tone="muted">Billing and invoices</Text>
          </>
        )}
      </div>
    </ThemeProvider>
  ),
};

export default meta;
