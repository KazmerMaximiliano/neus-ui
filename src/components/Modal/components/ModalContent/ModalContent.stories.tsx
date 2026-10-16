import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import "../../Modal.stories.css";
import { ModalContent as ModalContentComponent } from "./ModalContent";
import type { ModalContentStoryArgs } from "./ModalContent.types";

const meta: Meta<ModalContentStoryArgs> = {
  title: "Base/Modal/ModalContent",
  component: ModalContentComponent,
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
      description: "Free-form body content",
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

export const ModalContent: StoryObj<ModalContentStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "This permanently removes the project and its deployments.",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="modal modal-story">
        <ModalContentComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
