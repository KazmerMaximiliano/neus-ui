import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { FILE_ACCEPT_PATTERNS } from "./FileUploader.consts";

export type FileType = (typeof FILE_ACCEPT_PATTERNS)[keyof typeof FILE_ACCEPT_PATTERNS];

export type FileUploadError = {
  type: "size" | "type" | "count";
  message: string;
};

export type FileUploadData = {
  files: File[];
  totalSize: number;
};

export type FileUploaderProps = {
  readonly uploadHintValueClassName?: string;
  readonly uploadHintValueStyle?: CSSProperties;
  readonly areaClassName?: string;
  readonly className?: string;
  readonly contentClassName?: string;
  readonly contentStyle?: CSSProperties;
  readonly detailsClassName?: string;
  readonly detailsStyle?: CSSProperties;
  readonly errorClassName?: string;
  readonly fileCountClassName?: string;
  readonly fileCountStyle?: CSSProperties;
  readonly fileInfoClassName?: string;
  readonly fileInfoStyle?: CSSProperties;
  readonly fileNameClassName?: string;
  readonly fileNameStyle?: CSSProperties;
  readonly fileSizeClassName?: string;
  readonly fileSizeStyle?: CSSProperties;
  readonly iconClassName?: string;
  readonly iconContainerClassName?: string;
  readonly iconContainerStyle?: CSSProperties;
  readonly iconStyle?: CSSProperties;
  readonly inputClassName?: string;
  readonly inputStyle?: CSSProperties;
  readonly previewClassName?: string;
  readonly previewImageClassName?: string;
  readonly previewImageStyle?: CSSProperties;
  readonly previewStyle?: CSSProperties;
  readonly selectedClassName?: string;
  readonly selectedStyle?: CSSProperties;
  readonly style?: CSSProperties;
  readonly totalSizeClassName?: string;
  readonly totalSizeStyle?: CSSProperties;
  readonly uploadHintClassName?: string;
  readonly uploadHintStyle?: CSSProperties;
  readonly uploadIconClassName?: string;
  readonly uploadIconStyle?: CSSProperties;
  readonly uploadTextClassName?: string;
  readonly uploadTextStyle?: CSSProperties;
  readonly allowedTypes: readonly FileType[];
  readonly maxWeight?: number;
  readonly multiple?: boolean;
  readonly error?: string;
  readonly placeholder?: string;
  readonly deleteFilesText?: string;
  readonly disabled?: boolean;
  readonly name?: string;
  readonly label?: string;
  readonly areaStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
  readonly onChange: (data: FileUploadData | null, error?: FileUploadError) => void;
};

export type FileUploaderStoryArgs = FileUploaderProps & {
  readonly designSystem: DesignSystemId;
};
