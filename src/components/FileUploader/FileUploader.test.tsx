import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { FileUploader } from "./FileUploader";
import { FileType } from "./FileUploader.types";

afterEach(() => {
  cleanup();
});

const renderFileUploader = (props = {}) => {
  const defaultProps = {
    allowedTypes: [FileType.IMAGE],
    onChange: vi.fn(),
  };
  return render(
    <ThemeProvider>
      <FileUploader {...defaultProps} {...props} />
    </ThemeProvider>,
  );
};

describe("FileUploader", () => {
  describe("rendering", () => {
    it("renders file uploader container", () => {
      const { container } = renderFileUploader();
      expect(
        container.querySelector(".file-uploader-container"),
      ).toBeInTheDocument();
    });

    it("renders file upload area", () => {
      const { container } = renderFileUploader();
      expect(container.querySelector(".file-upload-area")).toBeInTheDocument();
    });

    it("renders upload icon", () => {
      const { container } = renderFileUploader();
      expect(container.querySelector(".upload-icon")).toBeInTheDocument();
    });

    it("renders default placeholder text", () => {
      renderFileUploader();
      expect(
        screen.getByText("Click to upload or drag and drop files here"),
      ).toBeInTheDocument();
    });

    it("renders custom placeholder text", () => {
      renderFileUploader({ placeholder: "Drop files here" });
      expect(screen.getByText("Drop files here")).toBeInTheDocument();
    });

    it("renders supported formats hint", () => {
      renderFileUploader();
      expect(screen.getByText(/Supported formats:/)).toBeInTheDocument();
    });

    it("renders max size hint", () => {
      renderFileUploader();
      expect(screen.getByText(/Max size:/)).toBeInTheDocument();
    });

    it("renders hidden file input", () => {
      const { container } = renderFileUploader();
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveStyle({ display: "none" });
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderFileUploader({ error: "File too large" });
      expect(screen.getByText("File too large")).toBeInTheDocument();
    });

    it("applies error class to upload area when error is present", () => {
      const { container } = renderFileUploader({ error: "Error" });
      expect(
        container.querySelector(".file-upload-area.error"),
      ).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderFileUploader({ disabled: true });
      expect(
        container.querySelector(".file-upload-area.disabled"),
      ).toBeInTheDocument();
    });

    it("does not trigger file input click when disabled", () => {
      const { container } = renderFileUploader({ disabled: true });
      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      const clickSpy = vi.spyOn(input, "click");
      const uploadArea = container.querySelector(".file-upload-area");
      fireEvent.click(uploadArea!);
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe("file input", () => {
    it("sets accept attribute based on allowedTypes", () => {
      const { container } = renderFileUploader({
        allowedTypes: [FileType.IMAGE, FileType.PDF],
      });
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("accept", "image/*,.pdf");
    });

    it("sets multiple attribute when multiple is true", () => {
      const { container } = renderFileUploader({ multiple: true });
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute("multiple");
    });

    it("does not set multiple attribute when multiple is false", () => {
      const { container } = renderFileUploader({ multiple: false });
      const input = container.querySelector('input[type="file"]');
      expect(input).not.toHaveAttribute("multiple");
    });
  });

  describe("file selection", () => {
    it("calls onChange with file data when file is selected", () => {
      const onChange = vi.fn();
      const { container } = renderFileUploader({ onChange });
      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;

      const file = new File(["test"], "test.png", { type: "image/png" });
      Object.defineProperty(input, "files", {
        value: [file],
      });

      fireEvent.change(input);
      expect(onChange).toHaveBeenCalled();
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      const { container } = renderFileUploader({ onChange, disabled: true });
      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;

      const file = new File(["test"], "test.png", { type: "image/png" });
      Object.defineProperty(input, "files", {
        value: [file],
      });

      fireEvent.change(input);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("drag and drop", () => {
    it("applies drag-active class on drag enter", () => {
      const { container } = renderFileUploader();
      const uploadArea = container.querySelector(".file-upload-area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });

      expect(
        container.querySelector(".file-upload-area.drag-active"),
      ).toBeInTheDocument();
    });

    it("removes drag-active class on drag leave", () => {
      const { container } = renderFileUploader();
      const uploadArea = container.querySelector(".file-upload-area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });
      fireEvent.dragLeave(uploadArea!);

      expect(
        container.querySelector(".file-upload-area.drag-active"),
      ).not.toBeInTheDocument();
    });

    it("does not apply drag-active class when disabled", () => {
      const { container } = renderFileUploader({ disabled: true });
      const uploadArea = container.querySelector(".file-upload-area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });

      expect(
        container.querySelector(".file-upload-area.drag-active"),
      ).not.toBeInTheDocument();
    });
  });

  describe("delete files text", () => {
    it("accepts custom delete files text prop", () => {
      const { container } = renderFileUploader({
        deleteFilesText: "Remove all",
      });
      expect(container.querySelector(".file-uploader-container")).toBeInTheDocument();
    });
  });
});
