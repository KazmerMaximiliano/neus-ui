import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import "../../Modal.stories.css";
import { ModalHeader as ModalHeaderComponent } from "./ModalHeader";
import type { ModalHeaderStoryArgs } from "./ModalHeader.types";

const meta: Meta<ModalHeaderStoryArgs> = {
  title: "Base/Modal/ModalHeader",
  component: ModalHeaderComponent,
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
      description: "Header content; it names the dialog",
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

export const ModalHeader: StoryObj<ModalHeaderStoryArgs> = {
  args: {
    designSystem: "neus",
    className: "",
    style: null,
    children: "Delete project",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="modal modal-story">
        <ModalHeaderComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
