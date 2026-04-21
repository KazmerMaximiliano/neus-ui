# FileUploader

Component for uploading files with type and size validation.

## Props

| Property          | Type                                                              | Required | Description                  |
| ----------------- | ----------------------------------------------------------------- | -------- | ---------------------------- |
| `allowedTypes`    | `FileType[]`                                                      | ✅       | Allowed file types           |
| `maxWeight`       | `number`                                                          | ❌       | Maximum file size in MB      |
| `multiple`        | `boolean`                                                         | ❌       | Allow multiple files         |
| `error`           | `string`                                                          | ❌       | Error message                |
| `placeholder`     | `string`                                                          | ❌       | Placeholder text             |
| `deleteFilesText` | `string`                                                          | ❌       | Delete button text           |
| `disabled`        | `boolean`                                                         | ❌       | Disables the uploader        |
| `onChange`        | `(data: FileUploadData \| null, error?: FileUploadError) => void` | ✅       | Callback with files or error |

**FileType Enum:**

```tsx
enum FileType {
  IMAGE = "image/*",
  PDF = ".pdf",
  DOC = ".doc,.docx",
  XLS = ".xls,.xlsx",
  TXT = ".txt",
  ZIP = ".zip",
  RAR = ".rar",
  VIDEO = "video/*",
  AUDIO = "audio/*",
  CSV = ".csv",
  JSON = ".json",
}
```

**FileUploadData / FileUploadError:**

```tsx
type FileUploadData = {
  files: File[];
  totalSize: number;
};

type FileUploadError = {
  type: "size" | "type" | "count";
  message: string;
};
```

## Usage Example

```tsx
import { FileUploader, FileType } from "@neus-ui/components";
import { useState } from "react";

export function DocumentUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileChange = (data, error) => {
    if (error) {
      setUploadError(error.message);
      setUploadedFiles([]);
    } else if (data) {
      setUploadError("");
      setUploadedFiles(data.files);
    }
  };

  return (
    <div>
      <FileUploader
        allowedTypes={[FileType.PDF, FileType.DOC, FileType.XLS]}
        maxWeight={10}
        multiple={true}
        placeholder="Drag your files here"
        deleteFilesText="Delete files"
        onChange={handleFileChange}
      />

      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

      {uploadedFiles.length > 0 && (
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```
