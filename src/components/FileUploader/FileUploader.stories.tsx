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
    uploadHintValueClassName: { control: "text", description: "Additional classes for format and size values in hints" },
    uploadHintValueStyle: { control: "object", description: "Styles for format and size values in hints" },
    areaClassName: {
      control: "text",
      description: "Additional classes for area",
    },
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    contentClassName: {
      control: "text",
      description: "Additional classes for content",
    },
    contentStyle: {
      control: "object",
      description: "Style override for content",
    },
    detailsClassName: {
      control: "text",
      description: "Additional classes for details",
    },
    detailsStyle: {
      control: "object",
      description: "Style override for details",
    },
    errorClassName: {
      control: "text",
      description: "Additional classes for error",
    },
    fileCountClassName: {
      control: "text",
      description: "Additional classes for fileCount",
    },
    fileCountStyle: {
      control: "object",
      description: "Style override for fileCount",
    },
    fileInfoClassName: {
      control: "text",
      description: "Additional classes for fileInfo",
    },
    fileInfoStyle: {
      control: "object",
      description: "Style override for fileInfo",
    },
    fileNameClassName: {
      control: "text",
      description: "Additional classes for fileName",
    },
    fileNameStyle: {
      control: "object",
      description: "Style override for fileName",
    },
    fileSizeClassName: {
      control: "text",
      description: "Additional classes for fileSize",
    },
    fileSizeStyle: {
      control: "object",
      description: "Style override for fileSize",
    },
    iconClassName: {
      control: "text",
      description: "Additional classes for icon",
    },
    iconContainerClassName: {
      control: "text",
      description: "Additional classes for iconContainer",
    },
    iconContainerStyle: {
      control: "object",
      description: "Style override for iconContainer",
    },
    iconStyle: { control: "object", description: "Style override for icon" },
    inputClassName: {
      control: "text",
      description: "Additional classes for input",
    },
    inputStyle: { control: "object", description: "Style override for input" },
    previewClassName: {
      control: "text",
      description: "Additional classes for preview",
    },
    previewImageClassName: {
      control: "text",
      description: "Additional classes for previewImage",
    },
    previewImageStyle: {
      control: "object",
      description: "Style override for previewImage",
    },
    previewStyle: {
      control: "object",
      description: "Style override for preview",
    },
    selectedClassName: {
      control: "text",
      description: "Additional classes for selected",
    },
    selectedStyle: {
      control: "object",
      description: "Style override for selected",
    },
    style: { control: "object", description: "Style override for style" },
    totalSizeClassName: {
      control: "text",
      description: "Additional classes for totalSize",
    },
    totalSizeStyle: {
      control: "object",
      description: "Style override for totalSize",
    },
    uploadHintClassName: {
      control: "text",
      description: "Additional classes for uploadHint",
    },
    uploadHintStyle: {
      control: "object",
      description: "Style override for uploadHint",
    },
    uploadIconClassName: {
      control: "text",
      description: "Additional classes for uploadIcon",
    },
    uploadIconStyle: {
      control: "object",
      description: "Style override for uploadIcon",
    },
    uploadTextClassName: {
      control: "text",
      description: "Additional classes for uploadText",
    },
    uploadTextStyle: {
      control: "object",
      description: "Style override for uploadText",
    },
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
    uploadHintValueClassName: undefined,
    uploadHintValueStyle: undefined,
    areaClassName: undefined,
    className: undefined,
    contentClassName: undefined,
    contentStyle: undefined,
    detailsClassName: undefined,
    detailsStyle: undefined,
    errorClassName: undefined,
    fileCountClassName: undefined,
    fileCountStyle: undefined,
    fileInfoClassName: undefined,
    fileInfoStyle: undefined,
    fileNameClassName: undefined,
    fileNameStyle: undefined,
    fileSizeClassName: undefined,
    fileSizeStyle: undefined,
    iconClassName: undefined,
    iconContainerClassName: undefined,
    iconContainerStyle: undefined,
    iconStyle: undefined,
    inputClassName: undefined,
    inputStyle: undefined,
    previewClassName: undefined,
    previewImageClassName: undefined,
    previewImageStyle: undefined,
    previewStyle: undefined,
    selectedClassName: undefined,
    selectedStyle: undefined,
    style: undefined,
    totalSizeClassName: undefined,
    totalSizeStyle: undefined,
    uploadHintClassName: undefined,
    uploadHintStyle: undefined,
    uploadIconClassName: undefined,
    uploadIconStyle: undefined,
    uploadTextClassName: undefined,
    uploadTextStyle: undefined,
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
