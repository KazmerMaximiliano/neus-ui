import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader as FileUplaoderComponent } from "./FileUploader";
import { FileType } from "./FileUploader.types";

const meta: Meta<typeof FileUplaoderComponent> = {
  title: "Components/FileUploader",
  component: FileUplaoderComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    allowedTypes: {
      control: "multi-select",
      options: Object.values(FileType),
    },
    maxWeight: {
      control: "number",
    },
    multiple: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the file uploader is disabled",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const FileUploader: Story = {
  args: {
    allowedTypes: [FileType.IMAGE, FileType.PDF, FileType.DOC],
    maxWeight: 5 * 1024 * 1024,
    multiple: false,
    disabled: false,
    onChange: (data, error) => {
      console.log("File upload data:", data);
      if (error) console.error("Upload error:", error);
    },
  },
};

export default meta;
