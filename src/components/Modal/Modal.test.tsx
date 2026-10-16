import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";
import { ModalContent } from "./components/ModalContent/ModalContent";
import { ModalFooter } from "./components/ModalFooter/ModalFooter";
import { ModalHeader } from "./components/ModalHeader/ModalHeader";

afterEach(cleanup);

const Example = ({ onClose = vi.fn() }: { onClose?: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal
        isOpen={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <ModalHeader>Delete project</ModalHeader>
        <ModalContent>Body</ModalContent>
        <ModalFooter>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

describe("Modal", () => {
  describe("rendering", () => {
    it("keeps a closed dialog without children out of the accessibility tree", () => {
      render(
        <Modal>
          <ModalContent>Body</ModalContent>
        </Modal>,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(screen.queryByText("Body")).not.toBeInTheDocument();
    });

    it("opens as a modal dialog named by its header", () => {
      const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
      render(
        <Modal isOpen>
          <ModalHeader>Delete project</ModalHeader>
          <ModalContent>Body</ModalContent>
        </Modal>,
      );
      expect(showModal).toHaveBeenCalledOnce();
      expect(
        screen.getByRole("dialog", { name: "Delete project" }),
      ).toHaveClass("modal");
      showModal.mockRestore();
    });

    it("prefers an explicit aria-label or aria-labelledby", () => {
      const { rerender } = render(
        <Modal isOpen aria-label="Settings">
          <ModalHeader>Ignored</ModalHeader>
        </Modal>,
      );
      expect(
        screen.getByRole("dialog", { name: "Settings" }),
      ).toBeInTheDocument();
      rerender(
        <>
          <h2 id="custom">Custom title</h2>
          <Modal isOpen aria-labelledby="custom" />
        </>,
      );
      expect(
        screen.getByRole("dialog", { name: "Custom title" }),
      ).toBeInTheDocument();
    });

    it("forwards classes, styles, native attributes and the dialog ref", () => {
      const ref = createRef<HTMLDialogElement>();
      const { rerender } = render(
        <Modal
          isOpen
          ref={ref}
          aria-label="Info"
          className="extra"
          style={{ width: 320 }}
          data-testid="dialog"
        />,
      );
      const dialog = screen.getByTestId("dialog");
      expect(ref.current).toBe(dialog);
      expect(dialog).toHaveClass("modal", "extra");
      expect(dialog).toHaveStyle({ width: "320px" });
      rerender(
        <Modal isOpen aria-label="Info" style={null} data-testid="dialog" />,
      );
      expect(screen.getByTestId("dialog").getAttribute("style") ?? "").toBe("");
    });
  });

  describe("interactions", () => {
    it("asks to close on Escape (cancel) without closing by itself", () => {
      const onClose = vi.fn();
      render(<Modal isOpen aria-label="Info" onClose={onClose} />);
      const dialog = screen.getByRole("dialog");
      const cancel = new Event("cancel", { cancelable: true });
      fireEvent(dialog, cancel);
      expect(onClose).toHaveBeenCalledOnce();
      expect(cancel.defaultPrevented).toBe(true);
      expect(dialog).toHaveAttribute("open");
    });

    it("asks to close on backdrop clicks but not on content clicks", () => {
      const onClose = vi.fn();
      const onClick = vi.fn();
      render(
        <Modal isOpen aria-label="Info" onClose={onClose} onClick={onClick}>
          <ModalContent>Body</ModalContent>
        </Modal>,
      );
      fireEvent.click(screen.getByText("Body"));
      expect(onClose).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("dialog"));
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("closes from a child action and returns focus to the opener", async () => {
      const onClose = vi.fn();
      render(<Example onClose={onClose} />);
      const opener = screen.getByRole("button", { name: "Open" });
      await userEvent.click(opener);
      expect(
        screen.getByRole("dialog", { name: "Delete project" }),
      ).toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(onClose).not.toHaveBeenCalled();
      expect(opener).toHaveFocus();
    });
  });
});
