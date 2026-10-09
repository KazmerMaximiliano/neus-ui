import { composeStories } from "@storybook/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "./Button";
import * as stories from "./Button.stories";
import type { ButtonProps } from "./Button.types";
import { getButtonClasses } from "./Button.utils";

afterEach(cleanup);

const { Button: ButtonStory } = composeStories(stories);

const renderButton = (props: Partial<ButtonProps> = {}) => {
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
      expect(button).toHaveClass("button", "button--solid", "button--primary");
    });

    it("renders with custom variant and color", () => {
      renderButton({ variant: "outlined", color: "success" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("button--outlined", "button--success");
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
        expect(button).toHaveClass(`button--${variant}`, "button--primary");
      },
    );
  });

  describe("colors", () => {
    it.each(["primary", "success", "error", "info", "white"] as const)(
      "renders %s color correctly",
      (color) => {
        renderButton({ color });
        const button = screen.getByRole("button");
        expect(button).toHaveClass("button--solid", `button--${color}`);
      },
    );
  });
});

describe("Button accessibility", () => {
  it("preserves its accessible name while loading and restores the label afterward", () => {
    const { rerender } = render(<Button label="Save changes" loading />);
    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button")).toBeDisabled();

    rerender(<Button label="Save changes" />);
    const button = screen.getByRole("button", { name: "Save changes" });
    expect(button).toHaveTextContent("Save changes");
    expect(button).not.toHaveAttribute("aria-busy");
    expect(button).not.toHaveAttribute("aria-label");
    expect(button).toBeEnabled();
  });
});

describe("Button Storybook design systems", () => {
  it("defaults to Neus UI independently of the toolbar's system", () => {
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
        <ButtonStory />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button.closest("[data-design-system]")).toHaveAttribute("data-design-system", "neus");
    expect(button.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
    expect(button).not.toHaveAttribute("designSystem");

    rerender(
      <ThemeProvider scope="local" designSystem="apple" colorScheme="light">
        <ButtonStory />
      </ThemeProvider>,
    );
    expect(button.closest("[data-design-system]")).toHaveAttribute("data-design-system", "neus");
    expect(button.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "light");
  });

  it.each(DESIGN_SYSTEMS)("previews $name independently of the toolbar selection", ({ id }) => {
    render(
      <ThemeProvider scope="local" designSystem="neus" colorScheme="dark">
        <ButtonStory designSystem={id} label="Continue" />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button.closest("[data-design-system]")).toHaveAttribute("data-design-system", id);
    expect(button.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
  });

  it("applies the controls and click handler to the selected system", () => {
    const onClick = vi.fn();
    render(
      <ThemeProvider scope="local" colorScheme="dark">
        <ButtonStory designSystem="carbon" label="Save" variant="outlined" color="error"
          size="large" fullWidth onClick={onClick} />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveClass("button--outlined", "button--error", "button--large", "button--full-width");
    expect(button.closest("[data-design-system]")).toHaveAttribute("data-design-system", "carbon");
    expect(button.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it.each(["loading", "disabled"] as const)("applies the %s control to the preview", (state) => {
    const onClick = vi.fn();
    render(<ButtonStory label="Save" {...{ [state]: true }} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    if (state === "loading") expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("switches systems without changing the document theme", () => {
    const previousSystem = document.documentElement.getAttribute("data-design-system");
    const previousStyles = document.documentElement.style.cssText;
    const { rerender } = render(<ButtonStory />);
    expect(screen.getByRole("button").closest("[data-design-system]"))
      .toHaveAttribute("data-design-system", "neus");

    rerender(<ButtonStory designSystem="carbon" />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("button").closest("[data-design-system]"))
      .toHaveAttribute("data-design-system", "carbon");
    expect(document.documentElement.getAttribute("data-design-system")).toBe(previousSystem);
    expect(document.documentElement.style.cssText).toBe(previousStyles);
  });
});

describe("getButtonClasses", () => {
  it("returns base button class", () => {
    const result = getButtonClasses("solid", "primary", "medium", false);
    expect(result).toContain("button");
  });

  it("returns correct variant-color class", () => {
    const result = getButtonClasses("solid", "primary", "medium", false);
    expect(result).toContain("button--solid");
    expect(result).toContain("button--primary");
  });

  it("includes fullWidth class when true", () => {
    const result = getButtonClasses("solid", "primary", "medium", true);
    expect(result).toContain("button--full-width");
  });

  it("does not include fullWidth class when false", () => {
    const result = getButtonClasses("solid", "primary", "medium", false);
    expect(result).not.toContain("button--full-width");
  });

  it.each([
    ["small"],
    ["medium"],
    ["large"],
  ])("includes size class button--%s", (size) => {
    const result = getButtonClasses("solid", "primary", size, false);
    expect(result).toContain(`button--${size}`);
  });

  it.each([
    ["solid", "primary"],
    ["solid", "success"],
    ["solid", "error"],
    ["solid", "info"],
    ["outlined", "primary"],
    ["outlined", "success"],
    ["outlined", "error"],
    ["outlined", "info"],
    ["text", "primary"],
    ["text", "success"],
    ["text", "error"],
    ["text", "info"],
  ])("returns correct class for %s variant with %s color", (variant, color) => {
    const result = getButtonClasses(variant, color, "medium", false);
    expect(result).toContain(`button--${variant}`);
    expect(result).toContain(`button--${color}`);
  });

  it("returns trimmed string without extra spaces when fullWidth is false", () => {
    const result = getButtonClasses("solid", "primary", "medium", false);
    expect(result).not.toMatch(/\s{2,}/);
  });
});
