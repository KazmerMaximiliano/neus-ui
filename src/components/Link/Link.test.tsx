import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

afterEach(() => {
  cleanup();
});

const renderLink = (props: { label: string; type?: "primary" | "secondary"; href?: string; onClick?: () => void }) => {
  return render(<Link {...props} />);
};

describe("Link", () => {
  describe("rendering", () => {
    it("renders link element", () => {
      renderLink({ label: "Test Link" });
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("renders with label text", () => {
      renderLink({ label: "Test Link" });
      expect(screen.getByRole("link")).toHaveTextContent("Test Link");
    });

    it("renders with default href", () => {
      renderLink({ label: "Test Link" });
      expect(screen.getByRole("link")).toHaveAttribute("href", "#");
    });

    it("renders with custom href", () => {
      renderLink({ label: "Test Link", href: "https://example.com" });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://example.com",
      );
    });

    it("renders with base link class", () => {
      renderLink({ label: "Test Link" });
      expect(screen.getByRole("link")).toHaveClass("link");
    });
  });

  describe("types", () => {
    it("renders primary type by default", () => {
      renderLink({ label: "Test Link" });
      expect(screen.getByRole("link")).toHaveClass("link--primary");
    });

    it("renders primary type when specified", () => {
      renderLink({ label: "Test Link", type: "primary" });
      expect(screen.getByRole("link")).toHaveClass("link--primary");
    });

    it("renders secondary type when specified", () => {
      renderLink({ label: "Test Link", type: "secondary" });
      expect(screen.getByRole("link")).toHaveClass("link--secondary");
    });

    it.each(["primary", "secondary"] as const)(
      "applies correct class for %s type",
      (type) => {
        renderLink({ label: "Test Link", type });
        expect(screen.getByRole("link")).toHaveClass(`link--${type}`);
      },
    );
  });

  describe("click handling", () => {
    it("calls onClick when clicked", () => {
      const onClick = vi.fn();
      renderLink({ label: "Test Link", onClick });
      fireEvent.click(screen.getByRole("link"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("works without onClick handler", () => {
      renderLink({ label: "Test Link" });
      expect(() => fireEvent.click(screen.getByRole("link"))).not.toThrow();
    });
  });
});
