import type { FileType, FileUploadError } from './FileUploader.types';
import { FILE_ACCEPT_PATTERNS } from './FileUploader.consts';

export const validateFileSize = (
  files: File[],
  maxWeight: number
): { valid: boolean; error?: FileUploadError } => {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > maxWeight) {
    return {
      valid: false,
      error: {
        type: 'size',
        message: `File size exceeds maximum allowed (${(
          maxWeight /
          1024 /
          1024
        ).toFixed(1)}MB)`,
      },
    };
  }

  return { valid: true };
};

export const validateFileCount = (
  files: File[],
  multiple: boolean
): { valid: boolean; error?: FileUploadError } => {
  if (!multiple && files.length > 1) {
    return {
      valid: false,
      error: {
        type: 'count',
        message: 'Only one file is allowed',
      },
    };
  }

  return { valid: true };
};

export const validateFileTypes = (
  files: File[],
  allowedTypes: readonly FileType[]
): { valid: boolean; error?: FileUploadError } => {
  for (const file of files) {
    const isValidType = allowedTypes.some((type) => {
      if (type === FILE_ACCEPT_PATTERNS.IMAGE) return file.type.startsWith('image/');
      if (type === FILE_ACCEPT_PATTERNS.VIDEO) return file.type.startsWith('video/');
      if (type === FILE_ACCEPT_PATTERNS.AUDIO) return file.type.startsWith('audio/');

      return type
        .split(',')
        .some(
          (ext) =>
            file.name.toLowerCase().endsWith(ext) ||
            file.type.includes(ext.replace('.', '')),
        );
    });

    if (!isValidType) {
      return {
        valid: false,
        error: {
          type: 'type',
          message: `File type "${file.type}" is not allowed`,
        },
      };
    }
  }

  return { valid: true };
};

export const validateFiles = (
  files: FileList | File[],
  allowedTypes: readonly FileType[],
  maxWeight: number,
  multiple: boolean
): { valid: boolean; error?: FileUploadError } => {
  const fileArray = Array.from(files);

  const sizeValidation = validateFileSize(fileArray, maxWeight);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  const countValidation = validateFileCount(fileArray, multiple);
  if (!countValidation.valid) {
    return countValidation;
  }

  const typeValidation = validateFileTypes(fileArray, allowedTypes);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  return { valid: true };
};
