import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../../providers/ThemeProvider";
import { Button } from "../Button";

afterEach(() => {
  cleanup();
});

const renderButton = (props = {}) => {
  return render(
    <ThemeProvider>
      <Button label="Test Button" {...props} />
    </ThemeProvider>,
  );
};

describe("Button", () => {
  describe("rendering", () => {
    it("renders with label", () => {
      renderButton();
      expect(screen.getByRole("button")).toHaveTextContent("Test Button");
    });

    it("renders with default props", () => {
      renderButton();
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
      expect(button).not.toBeDisabled();
      expect(button).toHaveClass("button", "button--solid-primary");
    });

    it("renders with custom variant and color", () => {
      renderButton({ variant: "outlined", color: "success" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("button--outlined-success");
    });

    it("renders with fullWidth class when fullWidth is true", () => {
      renderButton({ fullWidth: true });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("button--full-width");
    });

    it("renders with correct button type", () => {
      renderButton({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      renderButton({ disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("is disabled when loading prop is true", () => {
      renderButton({ loading: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("loading state", () => {
    it("shows loader when loading is true", () => {
      renderButton({ loading: true });
      const button = screen.getByRole("button");
      expect(button).not.toHaveTextContent("Test Button");
    });

    it("shows label when loading is false", () => {
      renderButton({ loading: false });
      expect(screen.getByRole("button")).toHaveTextContent("Test Button");
    });
  });

  describe("click handling", () => {
    it("calls onClick when clicked", () => {
      const onClick = vi.fn();
      renderButton({ onClick });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const onClick = vi.fn();
      renderButton({ onClick, disabled: true });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const onClick = vi.fn();
      renderButton({ onClick, loading: true });
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("works without onClick handler", () => {
      renderButton();
      expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
    });
  });

  describe("variants", () => {
    it.each(["solid", "outlined", "text"] as const)(
      "renders %s variant correctly",
      (variant) => {
        renderButton({ variant });
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`button--${variant}-primary`);
      },
    );
  });

  describe("colors", () => {
    it.each(["primary", "success", "error", "info"] as const)(
      "renders %s color correctly",
      (color) => {
        renderButton({ color });
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`button--solid-${color}`);
      },
    );
  });
});
