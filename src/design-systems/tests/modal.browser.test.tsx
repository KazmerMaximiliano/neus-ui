import { useState } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent as browserEvent } from "vitest/browser";
import { Button } from "../../components/Button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "../../components/Modal";
import { ThemeProvider } from "../../providers";
import { contrastRatio } from "./colorContrast";
import type { DesignSystemId } from "../design-systems.types";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "16px", border: "0px" },
  { id: "apple", radius: "14px", border: "0px" },
  { id: "carbon", radius: "0px", border: "0px" },
  { id: "material", radius: "28px", border: "0px" },
  { id: "neobrutalism", radius: "4px", border: "3px" },
  { id: "vercel", radius: "12px", border: "1px" },
] as const;

const Example = ({ system, scheme }: { system: DesignSystemId; scheme: "light" | "dark" }) => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
      <Button label="Open" onClick={() => setOpen(true)} />
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalHeader>Delete project</ModalHeader>
        <ModalContent>This cannot be undone.</ModalContent>
        <ModalFooter>
          <Button label="Cancel" variant="outlined" onClick={() => setOpen(false)} />
          <Button label="Delete" color="error" />
        </ModalFooter>
      </Modal>
    </ThemeProvider>
  );
};

describe.each(["light", "dark"] as const)("Modal designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("opens a themed $id modal and restores focus on Escape", async (system) => {
    const user = userEvent.setup();
    render(<Example system={system.id} scheme={scheme} />);
    const opener = screen.getByRole("button", { name: "Open" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "Delete project" });
    expect(dialog.matches(":modal")).toBe(true);
    expect(dialog.closest(`[data-design-system="${system.id}"]`)).not.toBeNull();
    const styles = getComputedStyle(dialog);
    expect(styles.borderRadius).toBe(system.radius);
    expect(styles.borderTopWidth).toBe(system.border);
    expect(getComputedStyle(dialog, "::backdrop").backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    const content = getComputedStyle(screen.getByText("This cannot be undone."));
    expect(contrastRatio(content.color, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    const title = getComputedStyle(screen.getByText("Delete project"));
    expect(contrastRatio(title.color, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(dialog.contains(document.activeElement)).toBe(true);

    // A real key press: synthetic events do not trigger the native cancel.
    await browserEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(opener).toHaveFocus();
  });
});

describe("Modal behavior in the browser", () => {
  it("closes from a backdrop click but not from a content click", async () => {
    const user = userEvent.setup();
    render(<Example system="neus" scheme="light" />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    await user.click(screen.getByText("This cannot be undone."));
    expect(dialog).toHaveAttribute("open");
    const box = dialog.getBoundingClientRect();
    await user.pointer({ keys: "[MouseLeft]", coords: { clientX: box.left - 8, clientY: box.top - 8 }, target: dialog });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("lays out Carbon footer actions edge to edge", async () => {
    const user = userEvent.setup();
    render(<Example system="carbon" scheme="light" />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog").getBoundingClientRect();
    const cancel = screen.getByRole("button", { name: "Cancel" }).getBoundingClientRect();
    const remove = screen.getByRole("button", { name: "Delete" }).getBoundingClientRect();
    expect(cancel.left).toBeCloseTo(dialog.left, 0);
    expect(remove.right).toBeCloseTo(dialog.right, 0);
    expect(cancel.right).toBeCloseTo(remove.left, 0);
  });
});
