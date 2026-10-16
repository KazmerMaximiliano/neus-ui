import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

afterEach(cleanup);

const items = () => [
  { label: "Profile", onClick: vi.fn() },
  { label: "Sign out", onClick: vi.fn() },
];

describe("Dropdown", () => {
  describe("rendering", () => {
    it("names the trigger after the account and announces a menu", () => {
      render(<Dropdown name="Ada" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Ada" });
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("shows the name initial without an icon and the icon otherwise", () => {
      const { rerender } = render(<Dropdown name="Ada" items={items()} />);
      expect(document.querySelector(".dropdown__avatar")).toHaveTextContent(
        "A",
      );
      rerender(<Dropdown name="Ada" icon={User} items={items()} />);
      expect(
        document.querySelector(".dropdown__avatar svg"),
      ).toBeInTheDocument();
    });

    it("falls back to a default label without a name", () => {
      render(<Dropdown items={items()} />);
      expect(screen.getByRole("button", { name: "Menú" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens with the name header and rotates the caret", async () => {
      render(<Dropdown name="Ada" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Ada" });
      await userEvent.click(trigger);
      expect(trigger).toHaveClass("dropdown__trigger--open");
      expect(screen.getByRole("menu", { name: "Ada" })).toHaveTextContent(
        "Ada",
      );
      expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus();
    });

    it("runs item actions and closes", async () => {
      const list = items();
      render(<Dropdown name="Ada" items={list} />);
      await userEvent.click(screen.getByRole("button", { name: "Ada" }));
      await userEvent.click(screen.getByRole("menuitem", { name: "Sign out" }));
      expect(list[1].onClick).toHaveBeenCalledOnce();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes on outside clicks and Escape", async () => {
      render(<Dropdown name="Ada" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Ada" });
      await userEvent.click(trigger);
      fireEvent.mouseDown(document.body);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      await userEvent.click(trigger);
      await userEvent.keyboard("{Escape}");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
    });
  });

  describe("customization", () => {
    it("applies each style object to its part", async () => {
      render(
        <Dropdown
          name="Ada"
          items={items()}
          triggerStyle={{ borderRadius: 2 }}
          menuStyle={{ minWidth: 280 }}
          itemStyle={{ paddingLeft: 30 }}
        />,
      );
      const trigger = screen.getByRole("button", { name: "Ada" });
      expect(trigger).toHaveStyle({ borderRadius: "2px" });
      await userEvent.click(trigger);
      expect(screen.getByRole("menu")).toHaveStyle({ minWidth: "280px" });
      expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveStyle({
        paddingLeft: "30px",
      });
    });
  });
});
