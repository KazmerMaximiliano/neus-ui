import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import "../../Modal.stories.css";
import { ModalFooter as ModalFooterComponent } from "./ModalFooter";
import type { ModalFooterStoryArgs } from "./ModalFooter.types";

const meta: Meta<ModalFooterStoryArgs> = {
  title: "Base/Modal/ModalFooter",
  component: ModalFooterComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the section",
    },
    children: {
      control: "text",
      description: "Actions and other footer content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on this element",
    },
    style: {
      control: "object",
      description:
        "CSS properties on this element only; null keeps the design-system defaults",
    },
  },
};

export const ModalFooter: StoryObj<ModalFooterStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "Footer actions",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="modal modal-story">
        <ModalFooterComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
