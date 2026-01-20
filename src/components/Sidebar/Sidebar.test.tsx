import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FaCog, FaHome, FaUser } from "react-icons/fa";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

vi.mock("../../hooks/useResponsive", () => ({
  useResponsive: () => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1024,
  }),
}));

afterEach(() => {
  cleanup();
});

const defaultItems = [
  { label: "Home", icon: FaHome, onClick: vi.fn() },
  { label: "Profile", icon: FaUser, onClick: vi.fn() },
  { label: "Settings", icon: FaCog, onClick: vi.fn() },
];

const renderSidebar = (props = {}) => {
  return render(<Sidebar items={defaultItems} {...props} />);
};

describe("Sidebar", () => {
  describe("rendering", () => {
    it("renders sidebar container", () => {
      const { container } = renderSidebar();
      expect(container.querySelector(".sidebar")).toBeInTheDocument();
    });

    it("renders sidebar header", () => {
      const { container } = renderSidebar();
      expect(container.querySelector(".sidebar-header")).toBeInTheDocument();
    });

    it("renders sidebar body", () => {
      const { container } = renderSidebar();
      expect(container.querySelector(".sidebar-body")).toBeInTheDocument();
    });

    it("renders all visible items", () => {
      renderSidebar();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("renders icons for items", () => {
      const { container } = renderSidebar();
      const icons = container.querySelectorAll(".sidebar-button-icon");
      expect(icons).toHaveLength(3);
    });
  });

  describe("title", () => {
    it("renders first character of title by default", () => {
      const { container } = renderSidebar({ title: "My App" });
      const titleElement = container.querySelector(".sidebar-title");
      expect(titleElement).toHaveTextContent("M");
    });

    it("renders full title on mouse enter", () => {
      const { container } = renderSidebar({ title: "My App" });
      const sidebar = container.querySelector(".sidebar");
      fireEvent.mouseEnter(sidebar!);
      const titleElement = container.querySelector(".sidebar-title");
      expect(titleElement).toHaveTextContent("My App");
    });

    it("returns to first character on mouse leave", () => {
      const { container } = renderSidebar({ title: "My App" });
      const sidebar = container.querySelector(".sidebar");
      fireEvent.mouseEnter(sidebar!);
      fireEvent.mouseLeave(sidebar!);
      const titleElement = container.querySelector(".sidebar-title");
      expect(titleElement).toHaveTextContent("M");
    });
  });

  describe("items", () => {
    it("calls onClick when item is clicked", () => {
      const onClick = vi.fn();
      const items = [{ label: "Click me", onClick }];
      const { container } = render(<Sidebar items={items} />);
      const button = container.querySelector(".sidebar-button");
      fireEvent.click(button!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("applies active class to active item", () => {
      const items = [
        { label: "Active", active: true, onClick: vi.fn() },
        { label: "Inactive", active: false, onClick: vi.fn() },
      ];
      const { container } = render(<Sidebar items={items} />);
      const buttons = container.querySelectorAll(".sidebar-button");
      expect(buttons[0]).toHaveClass("active");
      expect(buttons[1]).not.toHaveClass("active");
    });

    it("does not render items with visible=false", () => {
      const items = [
        { label: "Visible", visible: true, onClick: vi.fn() },
        { label: "Hidden", visible: false, onClick: vi.fn() },
      ];
      render(<Sidebar items={items} />);
      expect(screen.getByText("Visible")).toBeInTheDocument();
      expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    });

    it("renders items without icon", () => {
      const items = [{ label: "No Icon", onClick: vi.fn() }];
      render(<Sidebar items={items} />);
      expect(screen.getByText("No Icon")).toBeInTheDocument();
    });
  });
});
