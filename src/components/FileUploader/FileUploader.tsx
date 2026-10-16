import { CloudUpload, File, Image } from "lucide-react";
import React, {
  forwardRef,
  useCallback,
  useId,
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
      areaClassName,
      className,
      contentClassName,
      contentStyle,
      detailsClassName,
      detailsStyle,
      errorClassName,
      fileCountClassName,
      fileCountStyle,
      fileInfoClassName,
      fileInfoStyle,
      fileNameClassName,
      fileNameStyle,
      fileSizeClassName,
      fileSizeStyle,
      iconClassName,
      iconContainerClassName,
      iconContainerStyle,
      iconStyle,
      inputClassName,
      inputStyle,
      previewClassName,
      previewImageClassName,
      previewImageStyle,
      previewStyle,
      selectedClassName,
      selectedStyle,
      style,
      totalSizeClassName,
      totalSizeStyle,
      uploadHintClassName,
      uploadHintStyle,
      uploadHintValueClassName,
      uploadHintValueStyle,
      uploadIconClassName,
      uploadIconStyle,
      uploadTextClassName,
      uploadTextStyle,
      allowedTypes,
      maxWeight = 10 * 1024 * 1024,
      multiple = false,
      error,
      deleteFilesText = "Delete files",
      placeholder = "Click to upload or drag and drop files here",
      disabled = false,
      name,
      label = "Upload files",
      areaStyle,
      errorStyle,
      onChange,
    },
    ref,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputId = useId();
    const hintId = useId();
    const errorId = useId();

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
          <div
            className={["file-uploader__content", contentClassName]
              .filter(Boolean)
              .join(" ")}
            style={contentStyle}
          >
            <CloudUpload
              className={["file-uploader__upload-icon", uploadIconClassName]
                .filter(Boolean)
                .join(" ")}
              style={uploadIconStyle}
              aria-hidden
            />
            <p
              className={["file-uploader__upload-text", uploadTextClassName]
                .filter(Boolean)
                .join(" ")}
              style={uploadTextStyle}
            >
              {placeholder}
            </p>
            <p
              id={hintId}
              className={["file-uploader__upload-hint", uploadHintClassName]
                .filter(Boolean)
                .join(" ")}
              style={uploadHintStyle}
            >
              Supported formats:{" "}
              <span
                className={["file-uploader__upload-hint-value", uploadHintValueClassName].filter(Boolean).join(" ")}
                style={uploadHintValueStyle}
              >
                {allowedTypes.map((type) => type.replace("*", "")).join(", ")}
              </span>
            </p>
            <p
              className={["file-uploader__upload-hint", uploadHintClassName]
                .filter(Boolean)
                .join(" ")}
              style={uploadHintStyle}
            >
              Max size: <span
                className={["file-uploader__upload-hint-value", uploadHintValueClassName].filter(Boolean).join(" ")}
                style={uploadHintValueStyle}
              >{formatFileSize(maxWeight)}</span>
            </p>
          </div>
        );
      }

      if (previewUrl && !multiple && isImageFile(selectedFiles[0])) {
        return (
          <div
            className={["file-uploader__preview", previewClassName]
              .filter(Boolean)
              .join(" ")}
            style={previewStyle}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className={["file-uploader__preview-image", previewImageClassName]
                .filter(Boolean)
                .join(" ")}
              style={previewImageStyle}
            />
            <div
              className={["file-uploader__file-info", fileInfoClassName]
                .filter(Boolean)
                .join(" ")}
              style={fileInfoStyle}
            >
              <p
                className={["file-uploader__file-name", fileNameClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={fileNameStyle}
              >
                {selectedFiles[0].name}
              </p>
              <p
                className={["file-uploader__file-size", fileSizeClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={fileSizeStyle}
              >
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
        <div
          className={["file-uploader__selected", selectedClassName]
            .filter(Boolean)
            .join(" ")}
          style={selectedStyle}
        >
          <div
            className={["file-uploader__icon-container", iconContainerClassName]
              .filter(Boolean)
              .join(" ")}
            style={iconContainerStyle}
          >
            {isImageFile(selectedFiles[0]) ? (
              <Image
                className={["file-uploader__icon", iconClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={iconStyle}
                aria-hidden
              />
            ) : (
              <File
                className={["file-uploader__icon", iconClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={iconStyle}
                aria-hidden
              />
            )}
          </div>
          <div
            className={["file-uploader__details", detailsClassName]
              .filter(Boolean)
              .join(" ")}
            style={detailsStyle}
          >
            {multiple ? (
              <>
                <p
                  className={["file-uploader__file-count", fileCountClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={fileCountStyle}
                >
                  {selectedFiles.length} file
                  {selectedFiles.length > 1 ? "s" : ""} selected
                </p>
                <p
                  className={["file-uploader__total-size", totalSizeClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={totalSizeStyle}
                >
                  Total size:{" "}
                  {formatFileSize(
                    selectedFiles.reduce((sum, file) => sum + file.size, 0),
                  )}
                </p>
              </>
            ) : (
              <>
                <p
                  className={["file-uploader__file-name", fileNameClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={fileNameStyle}
                >
                  {selectedFiles[0].name}
                </p>
                <p
                  className={["file-uploader__file-size", fileSizeClassName]
                    .filter(Boolean)
                    .join(" ")}
                  style={fileSizeStyle}
                >
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

    const isEmpty = selectedFiles.length === 0;

    const Area = isEmpty ? "label" : "div";

    return (
      <div
        className={["file-uploader", className].filter(Boolean).join(" ")}
        style={style}
      >
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          name={name}
          multiple={multiple}
          accept={getAcceptString()}
          disabled={disabled}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [isEmpty && hintId, error && errorId].filter(Boolean).join(" ") ||
            undefined
          }
          onChange={handleInputChange}
          className={["file-uploader__input", inputClassName]
            .filter(Boolean)
            .join(" ")}
          style={inputStyle}
        />
        <Area
          {...(isEmpty && { htmlFor: inputId })}
          className={[
            `file-uploader__area${dragActive ? " file-uploader__area--drag-active" : ""}${error ? " file-uploader__area--error" : ""
            }${isEmpty ? "" : " file-uploader__area--has-files"}${disabled ? " file-uploader__area--disabled" : ""
            }`,
            areaClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={areaStyle}
          onDragEnter={!disabled ? handleDragIn : undefined}
          onDragLeave={!disabled ? handleDragOut : undefined}
          onDragOver={!disabled ? handleDrag : undefined}
          onDrop={!disabled ? handleDrop : undefined}
        >
          {renderContent()}
        </Area>
        {error && (
          <div
            id={errorId}
            className={["file-uploader__error-message", errorClassName]
              .filter(Boolean)
              .join(" ")}
            style={errorStyle}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
