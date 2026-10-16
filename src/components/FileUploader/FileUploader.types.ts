import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export enum FileType {
  IMAGE = "image/*",
  JPG = ".jpg,.jpeg",
  PNG = ".png",
  SVG = ".svg",
  GIF = ".gif",
  WEBP = ".webp",
  PDF = ".pdf",
  DOC = ".doc,.docx",
  XLS = ".xls,.xlsx",
  TXT = ".txt",
  ZIP = ".zip",
  RAR = ".rar",
  VIDEO = "video/*",
  AUDIO = "audio/*",
  CSV = ".csv",
  JSON = ".json",
}

export type FileUploadError = {
  type: "size" | "type" | "count";
  message: string;
};

export type FileUploadData = {
  files: File[];
  totalSize: number;
};

export type FileUploaderProps = {
  uploadHintValueClassName?: string;
  uploadHintValueStyle?: CSSProperties;
  areaClassName?: string;
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  detailsClassName?: string;
  detailsStyle?: CSSProperties;
  errorClassName?: string;
  fileCountClassName?: string;
  fileCountStyle?: CSSProperties;
  fileInfoClassName?: string;
  fileInfoStyle?: CSSProperties;
  fileNameClassName?: string;
  fileNameStyle?: CSSProperties;
  fileSizeClassName?: string;
  fileSizeStyle?: CSSProperties;
  iconClassName?: string;
  iconContainerClassName?: string;
  iconContainerStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  inputClassName?: string;
  inputStyle?: CSSProperties;
  previewClassName?: string;
  previewImageClassName?: string;
  previewImageStyle?: CSSProperties;
  previewStyle?: CSSProperties;
  selectedClassName?: string;
  selectedStyle?: CSSProperties;
  style?: CSSProperties;
  totalSizeClassName?: string;
  totalSizeStyle?: CSSProperties;
  uploadHintClassName?: string;
  uploadHintStyle?: CSSProperties;
  uploadIconClassName?: string;
  uploadIconStyle?: CSSProperties;
  uploadTextClassName?: string;
  uploadTextStyle?: CSSProperties;
  allowedTypes: FileType[];
  maxWeight?: number;
  multiple?: boolean;
  error?: string;
  placeholder?: string;
  deleteFilesText?: string;
  disabled?: boolean;
  name?: string;
  label?: string;
  areaStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  onChange: (data: FileUploadData | null, error?: FileUploadError) => void;
};

export type FileUploaderStoryArgs = FileUploaderProps & {
  designSystem: DesignSystemId;
};
