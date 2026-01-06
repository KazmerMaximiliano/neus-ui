import { Meta, StoryObj } from "@storybook/react";
import { Modal as ModalComponent } from "./Modal";

const meta: Meta<typeof ModalComponent> = {
  title: "Components/Modal",
  component: ModalComponent,
  parameters: {
    layout: "centered",
    docs: {
      autodocs: false,
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Whether the modal is visible or hidden",
      table: {
        type: { summary: "boolean" },
        category: "Props",
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: { type: "text" },
      description: "The title displayed in the modal header",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    children: {
      control: { type: "text" },
      description: "The content displayed in the modal body",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Props",
      },
    },
    confirmText: {
      control: { type: "text" },
      description: "Text for the confirm button",
      table: {
        type: { summary: "string" },
        category: "Props",
        defaultValue: { summary: "'Confirmar'" },
      },
    },
    cancelText: {
      control: { type: "text" },
      description: "Text for the cancel button",
      table: {
        type: { summary: "string" },
        category: "Props",
        defaultValue: { summary: "'Cancelar'" },
      },
    },
    confirmButtonColor: {
      control: { type: "select" },
      options: ["primary", "success", "error", "info"],
      description: "Color variant for the confirm button",
      table: {
        type: { summary: "'primary' | 'success' | 'error' | 'info'" },
        category: "Props",
        defaultValue: { summary: "'primary'" },
      },
    },
    onConfirm: {
      action: "confirmed",
      description: "Callback function triggered when confirm button is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    onCancel: {
      action: "cancelled",
      description:
        "Callback function triggered when cancel button is clicked or backdrop is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    children: "This is the modal content. You can add any content here.",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmButtonColor: "primary",
    onConfirm: () => console.log("Modal confirmed"),
    onCancel: () => console.log("Modal cancelled"),
  },
};

export default meta;
