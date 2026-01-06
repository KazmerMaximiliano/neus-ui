export enum FileType {
  IMAGE = 'image/*',
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
  onChange: (data: FileUploadData | null, error?: FileUploadError) => void;
}
