import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { FileUploader as FileUploaderComponent } from "./FileUploader";
import type { FileUploaderStoryArgs } from "./FileUploader.types";
import { FileType } from "./FileUploader.types";

const meta: Meta<FileUploaderStoryArgs> = {
  title: "Base/FileUploader",
  component: FileUploaderComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the uploader",
    },
    allowedTypes: {
      control: "multi-select",
      options: Object.values(FileType),
      description: "Accepted file types",
    },
    maxWeight: {
      control: "number",
      description: "Maximum total size in bytes",
    },
    multiple: { control: "boolean", description: "Allows several files" },
    label: {
      control: "text",
      description: "Accessible name of the file input",
    },
    placeholder: { control: "text", description: "Main text of the drop area" },
    deleteFilesText: {
      control: "text",
      description: "Label of the clear action",
    },
    error: {
      control: "text",
      description: "Error message linked to the input",
    },
    disabled: {
      control: "boolean",
      description: "Disables selection and dropping",
    },
    name: { control: "text", description: "Name of the native file input" },
    areaStyle: {
      control: "object",
      description: "CSS properties of the drop area",
    },
    errorStyle: {
      control: "object",
      description: "CSS properties of the error message",
    },
    onChange: {
      action: "changed",
      description: "Called with the files or a validation error",
    },
  },
};

export const FileUploader: StoryObj<FileUploaderStoryArgs> = {
  args: {
    designSystem: "neus",
    allowedTypes: [
      FileType.JPG,
      FileType.PNG,
      FileType.SVG,
      FileType.PDF,
      FileType.DOC,
    ],
    maxWeight: 5 * 1024 * 1024,
    multiple: false,
    label: "Upload files",
    placeholder: "Click to upload or drag and drop files here",
    deleteFilesText: "Delete files",
    error: "",
    disabled: false,
    name: "files",
    areaStyle: {},
    errorStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: 420 }}>
        <FileUploaderComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
