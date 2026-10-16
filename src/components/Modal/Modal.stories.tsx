import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/preview-api";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button/Button";
import { Modal as ModalComponent } from "./Modal";
import type { ModalStoryArgs } from "./Modal.types";
import { ModalContent } from "./components/ModalContent/ModalContent";
import { ModalFooter } from "./components/ModalFooter/ModalFooter";
import { ModalHeader } from "./components/ModalHeader/ModalHeader";

const meta: Meta<ModalStoryArgs> = {
  title: "Base/Modal",
  component: ModalComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the modal",
    },
    isOpen: {
      control: "boolean",
      description: "Shows the native modal dialog",
    },
    children: {
      control: false,
      description:
        "Composition of ModalHeader, ModalContent, ModalFooter or free content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes on the dialog",
    },
    style: {
      control: "object",
      description:
        "CSS properties on the dialog; null keeps the design-system defaults",
    },
    onClose: {
      action: "closed",
      description: "Requested by Escape and backdrop clicks",
    },
  },
};

export const Modal: StoryObj<ModalStoryArgs> = {
  args: {
    designSystem: "neus",
    isOpen: false,
    className: "",
    style: null,
  },
  render: function Render({ designSystem, onClose, ...args }) {
    const [, updateArgs] = useArgs<ModalStoryArgs>();
    const close = () => {
      updateArgs({ isOpen: false });
      onClose?.();
    };
    return (
      <ThemeProvider scope="local" designSystem={designSystem}>
        <Button
          label="Delete project"
          color="error"
          onClick={() => updateArgs({ isOpen: true })}
        />
        <ModalComponent {...args} onClose={close}>
          <ModalHeader>Delete project</ModalHeader>
          <ModalContent>
            This permanently removes the project, its deployments and its
            domains.
          </ModalContent>
          <ModalFooter>
            <Button label="Cancel" variant="outlined" onClick={close} />
            <Button label="Delete" color="error" onClick={close} />
          </ModalFooter>
        </ModalComponent>
      </ThemeProvider>
    );
  },
};

export default meta;
