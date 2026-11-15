// Patterns for the file input's `accept` attribute, keyed by the names consumers use (FileType.PNG).
export const FILE_ACCEPT_PATTERNS = {
  IMAGE: "image/*",
  JPG: ".jpg,.jpeg",
  PNG: ".png",
  SVG: ".svg",
  GIF: ".gif",
  WEBP: ".webp",
  PDF: ".pdf",
  DOC: ".doc,.docx",
  XLS: ".xls,.xlsx",
  TXT: ".txt",
  ZIP: ".zip",
  RAR: ".rar",
  VIDEO: "video/*",
  AUDIO: "audio/*",
  CSV: ".csv",
  JSON: ".json",
} as const;
