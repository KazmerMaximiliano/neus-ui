import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { IconButton } from "./IconButton";
import { getIconButtonClasses } from "./IconButton.utils";

afterEach(() => {
  cleanup();
});

const renderIconButton = (
  props: Partial<ComponentProps<typeof IconButton>> = {},
) =>
  render(
    <ThemeProvider>
      <IconButton icon={Plus} label="Add item" {...props} />
    </ThemeProvider>,
  );

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
        expect(button).toHaveClass(
          `icon-button--${variant}`,
          "icon-button--primary",
        );
      },
    );
  });

  describe("colors", () => {
    it.each(["primary", "success", "error", "info"] as const)(
      "renders %s color correctly",
      (color) => {
        renderIconButton({ color });
        const button = screen.getByRole("button");
        expect(button).toHaveClass(
          "icon-button--solid",
          `icon-button--${color}`,
        );
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

describe("IconButton accessibility and customization", () => {
  it("names the action through label and hides the decorative icon", () => {
    renderIconButton();
    const button = screen.getByRole("button", { name: "Add item" });
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(button.querySelector("svg")).toHaveClass("icon-button-icon");
  });

  it("keeps its name and exposes busy state while loading", () => {
    renderIconButton({ loading: true });
    const button = screen.getByRole("button", { name: "Add item" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector(".icon-button-loader")).toBeInTheDocument();
  });

  it("applies each style object to its own part", () => {
    const { rerender } = renderIconButton({
      buttonStyle: { borderRadius: 3 },
      iconStyle: { strokeWidth: 3 },
    });
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({ borderRadius: "3px" });
    expect(button.querySelector("svg")).toHaveStyle({ strokeWidth: "3" });
    rerender(
      <ThemeProvider>
        <IconButton
          icon={Plus}
          label="Add item"
          loading
          loaderStyle={{ gap: 5 }}
        />
      </ThemeProvider>,
    );
    expect(button.querySelector(".icon-button-loader")).toHaveStyle({
      gap: "5px",
    });
  });

  it("passes the click event to onClick", () => {
    const onClick = vi.fn();
    renderIconButton({ onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick.mock.calls[0][0]).toHaveProperty("type", "click");
  });

  it("builds variant, color and size classes", () => {
    expect(getIconButtonClasses("text", "error", "large")).toBe(
      "icon-button icon-button--text icon-button--error icon-button--large",
    );
  });
});
