import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Plus } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { IconButton } from "./IconButton";

afterEach(() => {
  cleanup();
});

const renderIconButton = (props = {}) => {
  return render(
    <ThemeProvider>
      <IconButton icon={Plus} {...props} />
    </ThemeProvider>,
  );
};

describe("IconButton", () => {
  describe("rendering", () => {
    it("renders button element", () => {
      renderIconButton();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      renderIconButton();
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toBeDisabled();
    });

    it("renders with correct button type", () => {
      renderIconButton({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("renders icon inside button", () => {
      renderIconButton();
      const button = screen.getByRole("button");
      expect(button.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      renderIconButton({ disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("is disabled when loading prop is true", () => {
      renderIconButton({ loading: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("loading state", () => {
    it("shows loader when loading is true", () => {
      renderIconButton({ loading: true });
      const button = screen.getByRole("button");
      expect(button.querySelector("svg")).not.toBeInTheDocument();
    });

    it("shows icon when loading is false", () => {
      renderIconButton({ loading: false });
      const button = screen.getByRole("button");
      expect(button.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("click handling", () => {
    it("calls onClick when clicked", () => {
      const onClick = vi.fn();
      renderIconButton({ onClick });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const onClick = vi.fn();
      renderIconButton({ onClick, disabled: true });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const onClick = vi.fn();
      renderIconButton({ onClick, loading: true });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("works without onClick handler", () => {
      renderIconButton();
      expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
    });
  });

  describe("variants", () => {
    it.each(["solid", "outlined", "text"] as const)(
      "renders %s variant correctly",
      (variant) => {
        renderIconButton({ variant });
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`icon-button--${variant}`, "icon-button--primary");
      },
    );
  });

  describe("colors", () => {
    it.each(["primary", "success", "error", "info"] as const)(
      "renders %s color correctly",
      (color) => {
        renderIconButton({ color });
        const button = screen.getByRole("button");
        expect(button).toHaveClass("icon-button--solid", `icon-button--${color}`);
      },
    );
  });

  describe("sizes", () => {
    it.each(["small", "medium", "large"] as const)(
      "renders %s size correctly",
      (size) => {
        renderIconButton({ size });
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`icon-button--${size}`);
      },
    );
  });
});
