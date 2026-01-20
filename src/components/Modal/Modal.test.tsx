import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { Modal } from "./Modal";

afterEach(() => {
  cleanup();
});

const renderModal = (props = {}) => {
  return render(
    <ThemeProvider>
      <Modal {...props} />
    </ThemeProvider>,
  );
};

describe("Modal", () => {
  describe("rendering", () => {
    it("renders nothing when isOpen is false", () => {
      const { container } = renderModal({ isOpen: false });
      expect(container.querySelector(".modal-backdrop")).not.toBeInTheDocument();
    });

    it("renders nothing when isOpen is not provided", () => {
      const { container } = renderModal();
      expect(container.querySelector(".modal-backdrop")).not.toBeInTheDocument();
    });

    it("renders backdrop when isOpen is true", () => {
      const { container } = renderModal({ isOpen: true });
      expect(container.querySelector(".modal-backdrop")).toBeInTheDocument();
    });

    it("renders modal content when isOpen is true", () => {
      const { container } = renderModal({ isOpen: true });
      expect(container.querySelector(".modal-content")).toBeInTheDocument();
    });
  });

  describe("title", () => {
    it("renders title when provided", () => {
      renderModal({ isOpen: true, title: "Test Title" });
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("does not render header when title is not provided", () => {
      const { container } = renderModal({ isOpen: true });
      expect(container.querySelector(".modal-header")).not.toBeInTheDocument();
    });

    it("renders header with title", () => {
      const { container } = renderModal({ isOpen: true, title: "Test Title" });
      expect(container.querySelector(".modal-header")).toBeInTheDocument();
    });
  });

  describe("children", () => {
    it("renders children when provided", () => {
      renderModal({
        isOpen: true,
        children: <div data-testid="modal-child">Child Content</div>,
      });
      expect(screen.getByTestId("modal-child")).toBeInTheDocument();
    });

    it("does not render body when children are not provided", () => {
      const { container } = renderModal({ isOpen: true });
      expect(container.querySelector(".modal-body")).not.toBeInTheDocument();
    });

    it("renders body with children", () => {
      const { container } = renderModal({
        isOpen: true,
        children: <span>Content</span>,
      });
      expect(container.querySelector(".modal-body")).toBeInTheDocument();
    });
  });

  describe("buttons", () => {
    it("renders confirm button when onConfirm is provided", () => {
      renderModal({ isOpen: true, onConfirm: vi.fn() });
      expect(screen.getByText("Confirmar")).toBeInTheDocument();
    });

    it("renders cancel button when onCancel is provided", () => {
      renderModal({ isOpen: true, onCancel: vi.fn() });
      expect(screen.getByText("Cancelar")).toBeInTheDocument();
    });

    it("renders custom confirm text", () => {
      renderModal({
        isOpen: true,
        onConfirm: vi.fn(),
        confirmText: "Yes, delete",
      });
      expect(screen.getByText("Yes, delete")).toBeInTheDocument();
    });

    it("renders custom cancel text", () => {
      renderModal({
        isOpen: true,
        onCancel: vi.fn(),
        cancelText: "No, go back",
      });
      expect(screen.getByText("No, go back")).toBeInTheDocument();
    });

    it("does not render footer when no handlers provided", () => {
      const { container } = renderModal({ isOpen: true });
      expect(container.querySelector(".modal-footer")).not.toBeInTheDocument();
    });

    it("renders footer when handlers are provided", () => {
      const { container } = renderModal({
        isOpen: true,
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
      });
      expect(container.querySelector(".modal-footer")).toBeInTheDocument();
    });
  });

  describe("click handling", () => {
    it("calls onConfirm when confirm button is clicked", () => {
      const onConfirm = vi.fn();
      renderModal({ isOpen: true, onConfirm });
      fireEvent.click(screen.getByText("Confirmar"));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when cancel button is clicked", () => {
      const onCancel = vi.fn();
      renderModal({ isOpen: true, onCancel });
      fireEvent.click(screen.getByText("Cancelar"));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when backdrop is clicked", () => {
      const onCancel = vi.fn();
      const { container } = renderModal({ isOpen: true, onCancel });
      const backdrop = container.querySelector(".modal-backdrop");
      fireEvent.click(backdrop!);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("does not call onCancel when modal content is clicked", () => {
      const onCancel = vi.fn();
      const { container } = renderModal({ isOpen: true, onCancel });
      const content = container.querySelector(".modal-content");
      fireEvent.click(content!);
      expect(onCancel).not.toHaveBeenCalled();
    });
  });
});
