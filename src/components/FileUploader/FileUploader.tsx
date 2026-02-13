import { CloudUpload, File, Image } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "../Button/Button";
import "./FileUploader.styles.css";
import { FileUploadData, FileUploaderProps } from "./FileUploader.types";
import { validateFiles } from "./FileUploader.utils";

export const FileUploader = ({
  allowedTypes,
  maxWeight = 10 * 1024 * 1024,
  multiple = false,
  error,
  deleteFilesText = "Delete files",
  placeholder = "Click to upload or drag and drop files here",
  disabled = false,
  onChange,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };

  const getAcceptString = useCallback(() => {
    return allowedTypes.join(",");
  }, [allowedTypes]);

  const createPreview = useCallback(
    (file: File) => {
      if (isImageFile(file) && !multiple) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [multiple],
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      if (disabled) return;

      const fileArray = Array.from(files);
      const validation = validateFiles(
        files,
        allowedTypes,
        maxWeight,
        multiple,
      );

      if (!validation.valid && validation.error) {
        onChange(null, validation.error);
        return;
      }

      setSelectedFiles(fileArray);
      createPreview(fileArray[0]);

      const uploadData: FileUploadData = {
        files: fileArray,
        totalSize: fileArray.reduce((sum, file) => sum + file.size, 0),
      };

      onChange(uploadData);
    },
    [allowedTypes, maxWeight, multiple, onChange, createPreview, disabled],
  );

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
    },
    [disabled],
  );

  const handleDragIn = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragActive(true);
      }
    },
    [disabled],
  );

  const handleDragOut = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    },
    [disabled],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    },
    [handleFiles, disabled],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    setPreviewUrl(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderContent = () => {
    // No files selected
    if (selectedFiles.length === 0) {
      return (
        <div className="file-upload-content">
          <CloudUpload className="upload-icon" />
          <p className="upload-text">{placeholder}</p>
          <p className="upload-hint">
            Supported formats:{" "}
            <span>
              {allowedTypes.map((type) => type.replace("*", "")).join(", ")}
            </span>
          </p>
          <p className="upload-hint">
            Max size: <span>{formatFileSize(maxWeight)}</span>
          </p>
        </div>
      );
    }

    // Preview for single image file when not multiple
    if (previewUrl && !multiple && isImageFile(selectedFiles[0])) {
      return (
        <div className="file-preview">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <div className="file-info">
            <p className="file-name">{selectedFiles[0].name}</p>
            <p className="file-size">{formatFileSize(selectedFiles[0].size)}</p>
          </div>
          <Button
            label={deleteFilesText}
            fullWidth={true}
            variant="outlined"
            color="error"
            onClick={clearFiles}
          />
        </div>
      );
    }

    return (
      <div className="file-selected">
        <div className="file-icon-container">
          {isImageFile(selectedFiles[0]) ? (
            <Image className="file-icon" />
          ) : (
            <File className="file-icon" />
          )}
        </div>
        <div className="file-details">
          {multiple ? (
            <>
              <p className="file-count">
                {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""}{" "}
                selected
              </p>
              <p className="total-size">
                Total size:{" "}
                {formatFileSize(
                  selectedFiles.reduce((sum, file) => sum + file.size, 0),
                )}
              </p>
            </>
          ) : (
            <>
              <p className="file-name">{selectedFiles[0].name}</p>
              <p className="file-size">
                {formatFileSize(selectedFiles[0].size)}
              </p>
            </>
          )}
        </div>
        <Button
          label={deleteFilesText}
          fullWidth={true}
          variant="outlined"
          color="error"
          onClick={clearFiles}
        />
      </div>
    );
  };

  return (
    <div className="file-uploader-container">
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={getAcceptString()}
        onChange={handleInputChange}
        className="file-input"
        style={{ display: "none" }}
      />
      <div
        className={`file-upload-area ${dragActive ? "drag-active" : ""} ${
          error ? "error" : ""
        } ${selectedFiles.length > 0 ? "has-files" : ""} ${
          disabled ? "disabled" : ""
        }`}
        {...(!disabled &&
          selectedFiles.length === 0 && { onClick: handleClick })}
        onDragEnter={!disabled ? handleDragIn : undefined}
        onDragLeave={!disabled ? handleDragOut : undefined}
        onDragOver={!disabled ? handleDrag : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        {renderContent()}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
