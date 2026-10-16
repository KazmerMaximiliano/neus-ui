import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FileType, FileUploader } from "../../components/FileUploader";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "16px", border: "2px" },
  { id: "apple", radius: "12px", border: "1px" },
  { id: "carbon", radius: "0px", border: "1px" },
  { id: "material", radius: "12px", border: "1px" },
  { id: "neobrutalism", radius: "4px", border: "3px" },
  { id: "vercel", radius: "12px", border: "1px" },
] as const;

describe.each(["light", "dark"] as const)("FileUploader designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders the $id drop area with legible hints and keyboard focus", async (system) => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <FileUploader allowedTypes={[FileType.PDF]} label="Contract" error="Too big" onChange={vi.fn()} />
      </ThemeProvider>,
    );
    const area = container.querySelector(".file-uploader__area") as HTMLElement;
    const styles = getComputedStyle(area);
    expect(styles.borderRadius).toBe(system.radius);
    expect(styles.borderTopWidth).toBe(system.border);
    expect(styles.borderTopStyle).toBe("dashed");
    const surface = resolveColor(area.parentElement!, "--color-surface");
    const background = flatten(styles.backgroundColor, surface);
    const hint = getComputedStyle(container.querySelector(".file-uploader__upload-hint")!);
    expect(contrastRatio(hint.color, background)).toBeGreaterThanOrEqual(4.5);
    const error = getComputedStyle(screen.getByText("Too big"));
    expect(
      contrastRatio(error.color, flatten(error.backgroundColor, surface)),
    ).toBeGreaterThanOrEqual(4.5);

    await userEvent.tab();
    expect(screen.getByLabelText("Contract")).toHaveFocus();
    expect(styles.outlineStyle).toBe("solid");
  });
});

describe("FileUploader selection in the browser", () => {
  it("selects files through the native input and clears them", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <ThemeProvider scope="local">
        <FileUploader allowedTypes={[FileType.PDF]} label="Contract" onChange={onChange} />
      </ThemeProvider>,
    );
    const file = new File(["%PDF"], "contract.pdf", { type: "application/pdf" });
    // The drop area is the input's label; uploading through it mirrors a real click.
    await userEvent.upload(container.querySelector("label") as HTMLLabelElement, file);
    expect(onChange).toHaveBeenLastCalledWith({ files: [file], totalSize: 4 });
    await userEvent.click(screen.getByRole("button", { name: "Delete files" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
