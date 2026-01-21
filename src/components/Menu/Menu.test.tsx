import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FaUser } from "react-icons/fa";
import { Menu } from "./Menu";

afterEach(() => {
  cleanup();
});

const defaultItems = [
  { label: "Profile", onClick: vi.fn() },
  { label: "Settings", onClick: vi.fn() },
  { label: "Logout", onClick: vi.fn() },
];

const renderMenu = (props = {}) => {
  return render(<Menu items={defaultItems} {...props} />);
};

describe("Menu", () => {
  describe("rendering", () => {
    it("renders menu container", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu")).toBeInTheDocument();
    });

    it("renders avatar container", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu-avatar")).toBeInTheDocument();
    });

    it("renders X when no icon provided", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu-avatar")).toHaveTextContent("X");
    });

    it("renders icon when provided", () => {
      const { container } = renderMenu({ icon: FaUser });
      expect(container.querySelector(".menu-avatar svg")).toBeInTheDocument();
    });

    it("renders caret indicator", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu-caret")).toBeInTheDocument();
    });
  });

  describe("dropdown", () => {
    it("does not show dropdown by default", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu-dropdown")).not.toBeInTheDocument();
    });

    it("opens dropdown on click", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      expect(container.querySelector(".menu-dropdown")).toBeInTheDocument();
    });

    it("closes dropdown on second click", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      fireEvent.click(menu!);
      expect(container.querySelector(".menu-dropdown")).not.toBeInTheDocument();
    });

    it("shows name in dropdown when provided", () => {
      const { container } = renderMenu({ name: "John Doe" });
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("shows all menu items", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("adds open class to caret when dropdown is open", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      expect(container.querySelector(".menu-caret--open")).toBeInTheDocument();
    });

    it("closes dropdown on outside click", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      expect(container.querySelector(".menu-dropdown")).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(container.querySelector(".menu-dropdown")).not.toBeInTheDocument();
    });
  });

  describe("menu items", () => {
    it("calls item onClick when clicked", () => {
      const onClick = vi.fn();
      const items = [{ label: "Click me", onClick }];
      const { container } = render(<Menu items={items} />);
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      fireEvent.click(screen.getByText("Click me"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders items with clickable class", () => {
      const { container } = renderMenu();
      const menu = container.querySelector(".menu");
      fireEvent.click(menu!);
      const clickableItems = container.querySelectorAll(".menu-item.clickable");
      expect(clickableItems).toHaveLength(3);
    });
  });
});
