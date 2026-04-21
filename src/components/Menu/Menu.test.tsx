import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
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
  return render(
    <ThemeProvider>
      <Menu items={defaultItems} {...props} />
    </ThemeProvider>,
  );
};

describe("Menu", () => {
  describe("rendering", () => {
    it("renders menu container", () => {
      const { container } = renderMenu();
      expect(container.querySelector(".menu")).toBeInTheDocument();
    });

    it("renders a Button with text when text prop is provided", () => {
      renderMenu({ text: "Options" });
      expect(screen.getByText("Options")).toBeInTheDocument();
    });

    it("renders an IconButton when icon prop is provided", () => {
      const { container } = renderMenu({ icon: User });
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders a Button with empty label when no icon or text provided", () => {
      const { container } = renderMenu();
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("dropdown", () => {
    it("does not show dropdown by default", () => {
      renderMenu();
      expect(document.querySelector(".menu__dropdown")).not.toHaveClass(
        "menu__dropdown--open",
      );
    });

    it("opens dropdown on click with text trigger", () => {
      renderMenu({ text: "Options" });
      fireEvent.click(screen.getByText("Options"));
      expect(document.querySelector(".menu__dropdown")).toHaveClass(
        "menu__dropdown--open",
      );
    });

    it("closes dropdown on second click", () => {
      renderMenu({ text: "Options" });
      fireEvent.click(screen.getByText("Options"));
      fireEvent.click(screen.getByText("Options"));
      expect(document.querySelector(".menu__dropdown")).not.toHaveClass(
        "menu__dropdown--open",
      );
    });

    it("opens dropdown when icon trigger is clicked", () => {
      renderMenu({ icon: User });
      const button = document.querySelector("button");
      fireEvent.click(button!);
      expect(document.querySelector(".menu__dropdown")).toHaveClass(
        "menu__dropdown--open",
      );
    });

    it("shows all menu items when open", () => {
      renderMenu({ text: "Options" });
      fireEvent.click(screen.getByText("Options"));
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("closes dropdown on outside click", () => {
      renderMenu({ text: "Options" });
      fireEvent.click(screen.getByText("Options"));
      expect(document.querySelector(".menu__dropdown")).toHaveClass(
        "menu__dropdown--open",
      );
      fireEvent.mouseDown(document.body);
      expect(document.querySelector(".menu__dropdown")).not.toHaveClass(
        "menu__dropdown--open",
      );
    });
  });

  describe("menu items", () => {
    it("calls item onClick when clicked", () => {
      const onClick = vi.fn();
      const items = [{ label: "Click me", onClick }];
      render(
        <ThemeProvider>
          <Menu items={items} text="Options" />
        </ThemeProvider>,
      );
      fireEvent.click(screen.getByText("Options"));
      fireEvent.click(screen.getByText("Click me"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders items with clickable class", () => {
      renderMenu({ text: "Options" });
      fireEvent.click(screen.getByText("Options"));
      const clickableItems = document.querySelectorAll(".menu__item--clickable");
      expect(clickableItems).toHaveLength(3);
    });
  });
});
