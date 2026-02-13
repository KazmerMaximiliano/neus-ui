import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

afterEach(() => {
  cleanup();
});

const defaultItems = [
  { label: "Profile", onClick: vi.fn() },
  { label: "Settings", onClick: vi.fn() },
  { label: "Logout", onClick: vi.fn() },
];

const renderDropdown = (props = {}) => {
  return render(<Dropdown items={defaultItems} {...props} />);
};

describe("Dropdown", () => {
  describe("rendering", () => {
    it("renders dropdown container", () => {
      const { container } = renderDropdown();
      expect(container.querySelector(".dropdown")).toBeInTheDocument();
    });

    it("renders avatar container", () => {
      const { container } = renderDropdown();
      expect(container.querySelector(".dropdown-avatar")).toBeInTheDocument();
    });

    it("renders X when no icon provided", () => {
      const { container } = renderDropdown();
      expect(container.querySelector(".dropdown-avatar")).toHaveTextContent(
        "X",
      );
    });

    it("renders icon when provided", () => {
      const { container } = renderDropdown({ icon: User });
      expect(
        container.querySelector(".dropdown-avatar svg"),
      ).toBeInTheDocument();
    });

    it("renders caret indicator", () => {
      const { container } = renderDropdown();
      expect(container.querySelector(".dropdown-caret")).toBeInTheDocument();
    });
  });

  describe("panel", () => {
    it("does not show panel by default", () => {
      const { container } = renderDropdown();
      expect(container.querySelector(".dropdown-panel")).not.toHaveClass(
        "dropdown-panel--open",
      );
    });

    it("opens panel on click", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      expect(container.querySelector(".dropdown-panel")).toHaveClass(
        "dropdown-panel--open",
      );
    });

    it("closes panel on second click", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      fireEvent.click(dropdown!);
      expect(container.querySelector(".dropdown-panel")).not.toHaveClass(
        "dropdown-panel--open",
      );
    });

    it("shows name in panel when provided", () => {
      const { container } = renderDropdown({ name: "John Doe" });
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("shows all dropdown items", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("adds open class to caret when panel is open", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      expect(
        container.querySelector(".dropdown-caret--open"),
      ).toBeInTheDocument();
    });

    it("closes panel on outside click", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      expect(container.querySelector(".dropdown-panel")).toHaveClass(
        "dropdown-panel--open",
      );
      fireEvent.mouseDown(document.body);
      expect(container.querySelector(".dropdown-panel")).not.toHaveClass(
        "dropdown-panel--open",
      );
    });
  });

  describe("dropdown items", () => {
    it("calls item onClick when clicked", () => {
      const onClick = vi.fn();
      const items = [{ label: "Click me", onClick }];
      const { container } = render(<Dropdown items={items} />);
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      fireEvent.click(screen.getByText("Click me"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders items with clickable class", () => {
      const { container } = renderDropdown();
      const dropdown = container.querySelector(".dropdown");
      fireEvent.click(dropdown!);
      const clickableItems = container.querySelectorAll(
        ".dropdown-item.clickable",
      );
      expect(clickableItems).toHaveLength(3);
    });
  });
});
