import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";

export enum FileType {
  IMAGE = 'image/*',
  JPG = '.jpg,.jpeg',
  PNG = '.png',
  SVG = '.svg',
  GIF = '.gif',
  WEBP = '.webp',
  PDF = '.pdf',
  DOC = '.doc,.docx',
  XLS = '.xls,.xlsx',
  TXT = '.txt',
  ZIP = '.zip',
  RAR = '.rar',
  VIDEO = 'video/*',
  AUDIO = 'audio/*',
  CSV = '.csv',
  JSON = '.json',
}

export type FileUploadError = {
  type: 'size' | 'type' | 'count';
  message: string;
}

export type FileUploadData = {
  files: File[];
  totalSize: number;
}

export type FileUploaderProps = {
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
}

export type FileUploaderStoryArgs = FileUploaderProps & {
  designSystem: DesignSystemId;
};
