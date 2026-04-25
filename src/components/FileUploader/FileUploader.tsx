import { CloudUpload, File, Image } from "lucide-react";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "../Button/Button";
import "./FileUploader.styles.css";
import { FileUploadData, FileUploaderProps } from "./FileUploader.types";
import { validateFiles } from "./FileUploader.utils";

export const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      allowedTypes,
      maxWeight = 10 * 1024 * 1024,
      multiple = false,
      error,
      deleteFilesText = "Delete files",
      placeholder = "Click to upload or drag and drop files here",
      disabled = false,
      name,
      onChange,
    },
    ref,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);
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
      if (selectedFiles.length === 0) {
        return (
          <div className="file-uploader__content">
            <CloudUpload className="file-uploader__upload-icon" />
            <p className="file-uploader__upload-text">{placeholder}</p>
            <p className="file-uploader__upload-hint">
              Supported formats:{" "}
              <span>
                {allowedTypes.map((type) => type.replace("*", "")).join(", ")}
              </span>
            </p>
            <p className="file-uploader__upload-hint">
              Max size: <span>{formatFileSize(maxWeight)}</span>
            </p>
          </div>
        );
      }

      if (previewUrl && !multiple && isImageFile(selectedFiles[0])) {
        return (
          <div className="file-uploader__preview">
            <img
              src={previewUrl}
              alt="Preview"
              className="file-uploader__preview-image"
            />
            <div className="file-uploader__file-info">
              <p className="file-uploader__file-name">
                {selectedFiles[0].name}
              </p>
              <p className="file-uploader__file-size">
                {formatFileSize(selectedFiles[0].size)}
              </p>
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
        <div className="file-uploader__selected">
          <div className="file-uploader__icon-container">
            {isImageFile(selectedFiles[0]) ? (
              <Image className="file-uploader__icon" />
            ) : (
              <File className="file-uploader__icon" />
            )}
          </div>
          <div className="file-uploader__details">
            {multiple ? (
              <>
                <p className="file-uploader__file-count">
                  {selectedFiles.length} file
                  {selectedFiles.length > 1 ? "s" : ""} selected
                </p>
                <p className="file-uploader__total-size">
                  Total size:{" "}
                  {formatFileSize(
                    selectedFiles.reduce((sum, file) => sum + file.size, 0),
                  )}
                </p>
              </>
            ) : (
              <>
                <p className="file-uploader__file-name">
                  {selectedFiles[0].name}
                </p>
                <p className="file-uploader__file-size">
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
      <div className="file-uploader">
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          multiple={multiple}
          accept={getAcceptString()}
          onChange={handleInputChange}
          className="file-uploader__input"
          style={{ display: "none" }}
        />
        <div
          className={`file-uploader__area${dragActive ? " file-uploader__area--drag-active" : ""}${
            error ? " file-uploader__area--error" : ""
          }${selectedFiles.length > 0 ? " file-uploader__area--has-files" : ""}${
            disabled ? " file-uploader__area--disabled" : ""
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
        {error && <div className="file-uploader__error-message">{error}</div>}
      </div>
    );
  },
);
