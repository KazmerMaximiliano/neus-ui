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
      expect(container.querySelector(".file-uploader")).toBeInTheDocument();
    });

    it("renders file upload area", () => {
      const { container } = renderFileUploader();
      expect(
        container.querySelector(".file-uploader__area"),
      ).toBeInTheDocument();
    });

    it("renders upload icon", () => {
      const { container } = renderFileUploader();
      expect(
        container.querySelector(".file-uploader__upload-icon"),
      ).toBeInTheDocument();
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

    it("renders a named, focusable native file input described by the hints", () => {
      renderFileUploader({ label: "Avatar" });
      const input = screen.getByLabelText("Avatar");
      expect(input).toHaveAttribute("type", "file");
      expect(input).toHaveClass("file-uploader__input");
      expect(input).not.toHaveAttribute("style");
      expect(input).toHaveAccessibleDescription(/Supported formats/);
    });

    it("uses the empty drop area as the input label", () => {
      const { container } = renderFileUploader();
      const area = container.querySelector(".file-uploader__area")!;
      const input = container.querySelector('input[type="file"]')!;
      expect(area.tagName).toBe("LABEL");
      expect(area).toHaveAttribute("for", input.id);
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderFileUploader({ error: "File too large" });
      expect(screen.getByText("File too large")).toBeInTheDocument();
    });

    it("marks the input invalid and links the error message", () => {
      renderFileUploader({ error: "File too large", label: "Avatar" });
      const input = screen.getByLabelText("Avatar");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAccessibleDescription(/File too large/);
    });

    it("applies error class to upload area when error is present", () => {
      const { container } = renderFileUploader({ error: "Error" });
      expect(
        container.querySelector(".file-uploader__area--error"),
      ).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderFileUploader({ disabled: true });
      expect(
        container.querySelector(".file-uploader__area--disabled"),
      ).toBeInTheDocument();
    });

    it("disables the native input so the picker cannot open", () => {
      const { container } = renderFileUploader({ disabled: true });
      expect(container.querySelector('input[type="file"]')).toBeDisabled();
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
      const uploadArea = container.querySelector(".file-uploader__area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });

      expect(
        container.querySelector(".file-uploader__area--drag-active"),
      ).toBeInTheDocument();
    });

    it("removes drag-active class on drag leave", () => {
      const { container } = renderFileUploader();
      const uploadArea = container.querySelector(".file-uploader__area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });
      fireEvent.dragLeave(uploadArea!);

      expect(
        container.querySelector(".file-uploader__area--drag-active"),
      ).not.toBeInTheDocument();
    });

    it("does not apply drag-active class when disabled", () => {
      const { container } = renderFileUploader({ disabled: true });
      const uploadArea = container.querySelector(".file-uploader__area");

      fireEvent.dragEnter(uploadArea!, {
        dataTransfer: { items: [{}] },
      });

      expect(
        container.querySelector(".file-uploader__area--drag-active"),
      ).not.toBeInTheDocument();
    });
  });

  describe("delete files text", () => {
    it("accepts custom delete files text prop", () => {
      const { container } = renderFileUploader({
        deleteFilesText: "Remove all",
      });
      expect(container.querySelector(".file-uploader")).toBeInTheDocument();
    });
  });
});

describe("FileUploader parts", () => {
  it("applies areaStyle and errorStyle to their elements", () => {
    const { container } = renderFileUploader({
      error: "Too big",
      areaStyle: { minHeight: 90 },
      errorStyle: { fontSize: 18 },
    });
    expect(container.querySelector(".file-uploader__area")).toHaveStyle({
      minHeight: "90px",
    });
    expect(screen.getByText("Too big")).toHaveStyle({ fontSize: "18px" });
  });

  it("turns the area into a plain region once files are selected", () => {
    const { container } = renderFileUploader({
      allowedTypes: [FileType.PDF],
    });
    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, {
      target: {
        files: [new File(["x"], "doc.pdf", { type: "application/pdf" })],
      },
    });
    const area = container.querySelector(".file-uploader__area")!;
    expect(area.tagName).toBe("DIV");
    expect(area).toHaveClass("file-uploader__area--has-files");
    expect(screen.getByText("doc.pdf")).toBeInTheDocument();
  });
});
