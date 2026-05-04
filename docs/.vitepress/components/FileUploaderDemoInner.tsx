import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { FileUploader } from "@neus-ui/src/components/FileUploader/FileUploader";
import { FileType } from "@neus-ui/src/components/FileUploader/FileUploader.types";

export function FileUploaderDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1.5rem 0", maxWidth: "480px" }}>
        <div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, marginBottom: "0.75rem" }}>Images only</p>
          <FileUploader
            allowedTypes={[FileType.IMAGE]}
            maxWeight={5}
            multiple
            placeholder="Drop images here or click to upload"
            onChange={() => {}}
          />
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, marginBottom: "0.75rem" }}>PDF + DOC</p>
          <FileUploader
            allowedTypes={[FileType.PDF, FileType.DOC]}
            maxWeight={10}
            placeholder="Drop documents here"
            onChange={() => {}}
          />
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, marginBottom: "0.75rem" }}>Disabled</p>
          <FileUploader
            allowedTypes={[FileType.IMAGE]}
            disabled
            onChange={() => {}}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
