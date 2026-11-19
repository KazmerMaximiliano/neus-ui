import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { FileUploader } from "./FileUploader";
import { FILE_ACCEPT_PATTERNS } from "./FileUploader.consts";

afterEach(() => {
  cleanup();
});

const renderFileUploader = (props = {}) => {
  const defaultProps = {
    allowedTypes: [FILE_ACCEPT_PATTERNS.IMAGE],
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
      const input = container.querySelector("input[type=\"file\"]")!;
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
      expect(container.querySelector("input[type=\"file\"]")).toBeDisabled();
    });
  });

  describe("file input", () => {
    it("sets accept attribute based on allowedTypes", () => {
      const { container } = renderFileUploader({
        allowedTypes: [FILE_ACCEPT_PATTERNS.IMAGE, FILE_ACCEPT_PATTERNS.PDF],
      });
      const input = container.querySelector("input[type=\"file\"]");
      expect(input).toHaveAttribute("accept", "image/*,.pdf");
    });

    it("sets multiple attribute when multiple is true", () => {
      const { container } = renderFileUploader({ multiple: true });
      const input = container.querySelector("input[type=\"file\"]");
      expect(input).toHaveAttribute("multiple");
    });

    it("does not set multiple attribute when multiple is false", () => {
      const { container } = renderFileUploader({ multiple: false });
      const input = container.querySelector("input[type=\"file\"]");
      expect(input).not.toHaveAttribute("multiple");
    });
  });

  describe("file selection", () => {
    it("calls onChange with file data when file is selected", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = renderFileUploader({ onChange });
      const input = container.querySelector(
        "input[type=\"file\"]",
      ) as HTMLInputElement;

      const file = new File(["test"], "test.png", { type: "image/png" });

      await user.upload(input, file);
      expect(onChange).toHaveBeenCalled();
    });

    it("shows an image's preview beside its name, which names it", async () => {
      const user = userEvent.setup();
      const { container } = renderFileUploader();
      const input = container.querySelector("input[type=\"file\"]") as HTMLInputElement;

      await user.upload(input, new File(["test"], "photo.png", { type: "image/png" }));

      await waitFor(() => expect(container.querySelector(".file-uploader__preview-image")).toHaveAttribute("alt", ""));
      expect(screen.getByText("photo.png")).toHaveClass("file-uploader__file-name");
    });

    it("does not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = renderFileUploader({ onChange, disabled: true });
      const input = container.querySelector(
        "input[type=\"file\"]",
      ) as HTMLInputElement;

      const file = new File(["test"], "test.png", { type: "image/png" });

      await user.upload(input, file);
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

  it("turns the area into a plain region once files are selected", async () => {
    const user = userEvent.setup();
    const { container } = renderFileUploader({
      allowedTypes: [FILE_ACCEPT_PATTERNS.PDF],
    });
    const input = container.querySelector<HTMLInputElement>(
      "input[type=\"file\"]",
    )!;
    await user.upload(
      input,
      new File(["x"], "doc.pdf", { type: "application/pdf" }),
    );
    const area = container.querySelector(".file-uploader__area")!;
    expect(area.tagName).toBe("DIV");
    expect(area).toHaveClass("file-uploader__area--has-files");
    expect(screen.getByText("doc.pdf")).toBeInTheDocument();
  });
});

describe("FileUploader part customization", () => {
  it.each([
    { cls: "uploadHintValueClassName", sty: "uploadHintValueStyle", base: "file-uploader__upload-hint-value", phase: "default" },
    {
      cls: "contentClassName",
      sty: "contentStyle",
      base: "file-uploader__content",
      phase: "default",
    },
    {
      cls: "uploadIconClassName",
      sty: "uploadIconStyle",
      base: "file-uploader__upload-icon",
      phase: "default",
    },
    {
      cls: "uploadTextClassName",
      sty: "uploadTextStyle",
      base: "file-uploader__upload-text",
      phase: "default",
    },
    {
      cls: "uploadHintClassName",
      sty: "uploadHintStyle",
      base: "file-uploader__upload-hint",
      phase: "default",
    },
    {
      cls: "previewClassName",
      sty: "previewStyle",
      base: "file-uploader__preview",
      phase: "preview",
    },
    {
      cls: "previewImageClassName",
      sty: "previewImageStyle",
      base: "file-uploader__preview-image",
      phase: "preview",
    },
    {
      cls: "fileInfoClassName",
      sty: "fileInfoStyle",
      base: "file-uploader__file-info",
      phase: "preview",
    },
    {
      cls: "fileNameClassName",
      sty: "fileNameStyle",
      base: "file-uploader__file-name",
      phase: "preview",
    },
    {
      cls: "fileSizeClassName",
      sty: "fileSizeStyle",
      base: "file-uploader__file-size",
      phase: "preview",
    },
    {
      cls: "selectedClassName",
      sty: "selectedStyle",
      base: "file-uploader__selected",
      phase: "files",
    },
    {
      cls: "iconContainerClassName",
      sty: "iconContainerStyle",
      base: "file-uploader__icon-container",
      phase: "files",
    },
    {
      cls: "iconClassName",
      sty: "iconStyle",
      base: "file-uploader__icon",
      phase: "files",
    },
    {
      cls: "detailsClassName",
      sty: "detailsStyle",
      base: "file-uploader__details",
      phase: "files",
    },
    {
      cls: "fileCountClassName",
      sty: "fileCountStyle",
      base: "file-uploader__file-count",
      phase: "files",
    },
    {
      cls: "totalSizeClassName",
      sty: "totalSizeStyle",
      base: "file-uploader__total-size",
      phase: "files",
    },
    {
      cls: "className",
      sty: "style",
      base: "file-uploader",
      phase: "default",
    },
    {
      cls: "inputClassName",
      sty: "inputStyle",
      base: "file-uploader__input",
      phase: "default",
    },
    {
      cls: "areaClassName",
      sty: "areaStyle",
      base: "file-uploader__area",
      phase: "default",
    },
    {
      cls: "errorClassName",
      sty: "errorStyle",
      base: "file-uploader__error-message",
      phase: "default",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      const user = userEvent.setup();
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <FileUploader
            allowedTypes={[FILE_ACCEPT_PATTERNS.PNG, FILE_ACCEPT_PATTERNS.TXT]}
            multiple={phase === "files"}
            error="Invalid"
            onChange={() => { }}
            {...overrides}
          />
        </ThemeProvider>,
      );
      if (phase === "preview" || phase === "files") {
        const file = new File(
          ["content"],
          phase === "preview" ? "image.png" : "text.txt",
          { type: phase === "preview" ? "image/png" : "text/plain" },
        );
        await user.upload(
          view.container.querySelector<HTMLInputElement>(
            "input[type=\"file\"]",
          )!,
          file,
        );
        if (phase === "preview")
          await waitFor(() =>
            expect(
              view.container.querySelector(".file-uploader__preview-image"),
            ).toBeInTheDocument(),
          );
      }
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <FileUploader
            allowedTypes={[FILE_ACCEPT_PATTERNS.PNG, FILE_ACCEPT_PATTERNS.TXT]}
            multiple={phase === "files"}
            error="Invalid"
            onChange={() => { }}
          />
        </ThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
