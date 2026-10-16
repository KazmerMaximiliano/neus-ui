import {
  cleanup,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { Badge, Badge as CustomizationComponent } from "./Badge";
import { BadgeColor } from "./Badge.types";

afterEach(() => {
  cleanup();
});

describe("Badge", () => {
  describe("rendering", () => {
    it("renders label text", () => {
      render(<Badge label="Active" />);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders a span element", () => {
      render(<Badge label="Test" />);
      expect(document.querySelector(".badge")).toBeInTheDocument();
    });

    it("applies default classes (solid + neutral)", () => {
      render(<Badge label="Default" />);
      const badge = document.querySelector(".badge");
      expect(badge).toHaveClass("badge--solid");
      expect(badge).toHaveClass("badge--neutral");
    });
  });

  describe("variant", () => {
    it("applies solid class when variant is solid", () => {
      render(<Badge label="Solid" variant="solid" />);
      expect(document.querySelector(".badge")).toHaveClass("badge--solid");
    });

    it("applies dot class when variant is dot", () => {
      render(<Badge label="Dot" variant="dot" />);
      expect(document.querySelector(".badge")).toHaveClass("badge--dot");
    });

    it("renders badge__dot child when variant is dot", () => {
      render(<Badge label="Dot" variant="dot" />);
      expect(document.querySelector(".badge__dot")).toBeInTheDocument();
    });

    it("does not render badge__dot when variant is solid", () => {
      render(<Badge label="Solid" variant="solid" />);
      expect(document.querySelector(".badge__dot")).not.toBeInTheDocument();
    });

    it("does not render badge__dot by default", () => {
      render(<Badge label="Default" />);
      expect(document.querySelector(".badge__dot")).not.toBeInTheDocument();
    });
  });

  describe("color", () => {
    const colors: BadgeColor[] = [
      "primary",
      "success",
      "error",
      "info",
      "neutral",
    ];

    it.each(colors)("applies %s color class", (color) => {
      render(<Badge label="Label" color={color} />);
      expect(document.querySelector(".badge")).toHaveClass(`badge--${color}`);
    });

    it.each(colors)("dot variant applies %s color class", (color) => {
      render(<Badge label="Label" variant="dot" color={color} />);
      const badge = document.querySelector(".badge");
      expect(badge).toHaveClass(`badge--${color}`);
      expect(badge).toHaveClass("badge--dot");
    });
  });

  describe("combined props", () => {
    it("renders dot success badge correctly", () => {
      render(<Badge label="Online" variant="dot" color="success" />);
      const badge = document.querySelector(".badge");
      expect(badge).toHaveClass("badge--dot");
      expect(badge).toHaveClass("badge--success");
      expect(document.querySelector(".badge__dot")).toBeInTheDocument();
      expect(screen.getByText("Online")).toBeInTheDocument();
    });

    it("renders solid error badge correctly", () => {
      render(<Badge label="Rejected" variant="solid" color="error" />);
      const badge = document.querySelector(".badge");
      expect(badge).toHaveClass("badge--solid");
      expect(badge).toHaveClass("badge--error");
      expect(document.querySelector(".badge__dot")).not.toBeInTheDocument();
    });
  });
});

describe("Badge customization", () => {
  it("applies badgeStyle to the badge and dotStyle to the dot", () => {
    render(
      <Badge
        label="Online"
        variant="dot"
        badgeStyle={{ gap: 9 }}
        dotStyle={{ width: 11 }}
      />,
    );
    const badge = screen.getByText("Online");
    expect(badge).toHaveStyle({ gap: "9px" });
    expect(badge.querySelector(".badge__dot")).toHaveStyle({ width: "11px" });
  });

  it("hides the decorative dot from assistive technology", () => {
    render(<Badge label="Online" variant="dot" />);
    expect(document.querySelector(".badge__dot")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

describe("Badge part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "badgeStyle",
      base: "badge",
      phase: "default",
    },
    {
      cls: "dotClassName",
      sty: "dotStyle",
      base: "badge__dot",
      phase: "default",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base }) => {
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent label="Status" variant="dot" {...overrides} />
        </CustomizationThemeProvider>,
      );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent label="Status" variant="dot" />
        </CustomizationThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
