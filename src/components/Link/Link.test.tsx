import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Link } from "./Link";

afterEach(() => {
  cleanup();
});

const renderLink = (props: {
  label: string;
  type?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
}) => {
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

describe("Link native attributes and customization", () => {
  it("forwards native attributes and the ref to the anchor", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link
        ref={ref}
        label="Docs"
        href="/docs"
        target="_blank"
        rel="noopener"
        aria-describedby="hint"
      />,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
    expect(link).toHaveAttribute("aria-describedby", "hint");
    expect(link).not.toHaveAttribute("type");
  });

  it("merges className and applies style, ignoring null", () => {
    const { rerender } = render(
      <Link label="Docs" className="extra" style={{ fontSize: 20 }} />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("link", "link--primary", "extra");
    expect(link).toHaveStyle({ fontSize: "20px" });
    rerender(<Link label="Docs" style={null} />);
    expect(link.getAttribute("style") ?? "").toBe("");
  });
});
