import type { FileType as FileTypeUnion } from "./FileUploader.types";
import { FILE_ACCEPT_PATTERNS } from "./FileUploader.consts";

export { FileUploader } from "./FileUploader";
export type {
  FileUploadData,
  FileUploadError,
  FileUploaderProps,
} from "./FileUploader.types";

// Keeps the former enum's API: FileType is both a value (FileType.IMAGE) and a type (FileType[]).
export const FileType = FILE_ACCEPT_PATTERNS;
export type FileType = FileTypeUnion;
