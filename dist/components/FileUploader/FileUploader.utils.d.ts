import { FileType, FileUploadError } from './FileUploader.types';
export declare const validateFileSize: (files: File[], maxWeight: number) => {
    valid: boolean;
    error?: FileUploadError;
};
export declare const validateFileCount: (files: File[], multiple: boolean) => {
    valid: boolean;
    error?: FileUploadError;
};
export declare const validateFileTypes: (files: File[], allowedTypes: FileType[]) => {
    valid: boolean;
    error?: FileUploadError;
};
export declare const validateFiles: (files: FileList | File[], allowedTypes: FileType[], maxWeight: number, multiple: boolean) => {
    valid: boolean;
    error?: FileUploadError;
};
