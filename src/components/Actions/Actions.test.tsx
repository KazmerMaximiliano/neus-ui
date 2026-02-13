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

describe("Actions", () => {
  describe("rendering", () => {
    it("renders no buttons when no handlers are provided", () => {
      const { container } = renderActions();
      expect(container.querySelector("button")).toBeNull();
    });

    it("renders one button when onInfo is provided", () => {
      renderActions({ onInfo: vi.fn() });
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });

    it("renders one button when onEdit is provided", () => {
      renderActions({ onEdit: vi.fn() });
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });

    it("renders one button when onDelete is provided", () => {
      renderActions({ onDelete: vi.fn() });
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });

    it("renders container with correct class", () => {
      const { container } = renderActions({ onInfo: vi.fn() });
      expect(container.querySelector(".actions-container")).toBeInTheDocument();
    });

    it("renders three buttons when all handlers are provided", () => {
      renderActions({
        onInfo: vi.fn(),
        onEdit: vi.fn(),
        onDelete: vi.fn(),
      });
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("renders only buttons for provided handlers", () => {
      renderActions({ onInfo: vi.fn(), onDelete: vi.fn() });
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });
  });

  describe("click handling", () => {
    it("calls onInfo when info button is clicked", () => {
      const onInfo = vi.fn();
      renderActions({ onInfo });
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(onInfo).toHaveBeenCalledTimes(1);
    });

    it("calls onEdit when edit button is clicked", () => {
      const onEdit = vi.fn();
      renderActions({ onEdit });
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete when delete button is clicked", () => {
      const onDelete = vi.fn();
      renderActions({ onDelete });
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it("calls correct handler when multiple buttons exist", () => {
      const onInfo = vi.fn();
      const onEdit = vi.fn();
      const onDelete = vi.fn();
      renderActions({ onInfo, onEdit, onDelete });
      const buttons = screen.getAllByRole("button");

      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);
      fireEvent.click(buttons[2]);

      expect(onInfo).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });
});
