import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { Actions } from "./Actions";

afterEach(() => {
  cleanup();
});

const renderActions = (props = {}) => {
  return render(
    <ThemeProvider>
      <Actions {...props} />
    </ThemeProvider>,
  );
};

const openMenu = () => {
  const button = screen.getByRole("button");
  fireEvent.click(button);
};

describe("Actions", () => {
  describe("rendering", () => {
    it("renders nothing when no handlers are provided", () => {
      const { container } = renderActions();
      expect(container.querySelector(".actions-container")).toBeNull();
    });

    it("renders menu button when onInfo is provided", () => {
      renderActions({ onInfo: vi.fn() });
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders menu button when onEdit is provided", () => {
      renderActions({ onEdit: vi.fn() });
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders menu button when onDelete is provided", () => {
      renderActions({ onDelete: vi.fn() });
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders container with correct class", () => {
      const { container } = renderActions({ onInfo: vi.fn() });
      expect(container.querySelector(".actions-container")).toBeInTheDocument();
    });

    it("shows all menu items when all handlers are provided", () => {
      renderActions({
        onInfo: vi.fn(),
        onEdit: vi.fn(),
        onDelete: vi.fn(),
      });
      openMenu();
      expect(screen.getByText("Info")).toBeInTheDocument();
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("shows only provided menu items", () => {
      renderActions({ onInfo: vi.fn(), onDelete: vi.fn() });
      openMenu();
      expect(screen.getByText("Info")).toBeInTheDocument();
      expect(screen.queryByText("Edit")).toBeNull();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("renders custom labels when provided", () => {
      renderActions({
        onInfo: vi.fn(),
        onEdit: vi.fn(),
        onDelete: vi.fn(),
        infoLabel: "Detalles",
        editLabel: "Editar",
        deleteLabel: "Eliminar",
      });
      openMenu();
      expect(screen.getByText("Detalles")).toBeInTheDocument();
      expect(screen.getByText("Editar")).toBeInTheDocument();
      expect(screen.getByText("Eliminar")).toBeInTheDocument();
    });
  });

  describe("click handling", () => {
    it("calls onInfo when Info menu item is clicked", () => {
      const onInfo = vi.fn();
      renderActions({ onInfo });
      openMenu();
      fireEvent.click(screen.getByText("Info"));
      expect(onInfo).toHaveBeenCalledTimes(1);
    });

    it("calls onEdit when Edit menu item is clicked", () => {
      const onEdit = vi.fn();
      renderActions({ onEdit });
      openMenu();
      fireEvent.click(screen.getByText("Edit"));
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete when Delete menu item is clicked", () => {
      const onDelete = vi.fn();
      renderActions({ onDelete });
      openMenu();
      fireEvent.click(screen.getByText("Delete"));
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it("calls correct handler when multiple items exist", () => {
      const onInfo = vi.fn();
      const onEdit = vi.fn();
      const onDelete = vi.fn();
      renderActions({ onInfo, onEdit, onDelete });
      openMenu();
      fireEvent.click(screen.getByText("Info"));

      openMenu();
      fireEvent.click(screen.getByText("Edit"));

      openMenu();
      fireEvent.click(screen.getByText("Delete"));

      expect(onInfo).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });
});
