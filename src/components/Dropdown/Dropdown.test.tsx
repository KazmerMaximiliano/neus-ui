import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings, User } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers";
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
      expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens with the name header and rotates the caret", async () => {
      const user = userEvent.setup();
      render(<Dropdown name="Ada" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Ada" });
      await user.click(trigger);
      expect(trigger).toHaveClass("dropdown__trigger--open");
      expect(screen.getByRole("menu", { name: "Ada" })).toHaveTextContent(
        "Ada",
      );
      expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveFocus();
    });

    it("runs item actions and closes", async () => {
      const user = userEvent.setup();
      const list = items();
      render(<Dropdown name="Ada" items={list} />);
      await user.click(screen.getByRole("button", { name: "Ada" }));
      await user.click(screen.getByRole("menuitem", { name: "Sign out" }));
      expect(list[1].onClick).toHaveBeenCalledOnce();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes on outside clicks and Escape", async () => {
      const user = userEvent.setup();
      render(<Dropdown name="Ada" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Ada" });
      await user.click(trigger);
      await user.click(document.body);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      await user.click(trigger);
      await user.keyboard("{Escape}");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
    });
  });

  describe("customization", () => {
    it("applies each style object to its part", async () => {
      const user = userEvent.setup();
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
      await user.click(trigger);
      expect(screen.getByRole("menu")).toHaveStyle({ minWidth: "280px" });
      expect(screen.getByRole("menuitem", { name: "Profile" })).toHaveStyle({
        paddingLeft: "30px",
      });
    });
  });
});

describe("Dropdown part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "dropdown",
      phase: "default",
    },
    {
      cls: "triggerClassName",
      sty: "triggerStyle",
      base: "dropdown__trigger",
      phase: "default",
    },
    {
      cls: "avatarClassName",
      sty: "avatarStyle",
      base: "dropdown__avatar",
      phase: "default",
    },
    {
      cls: "avatarIconClassName",
      sty: "avatarIconStyle",
      base: "dropdown__avatar-icon",
      phase: "default",
    },
    {
      cls: "caretClassName",
      sty: "caretStyle",
      base: "dropdown__caret",
      phase: "default",
    },
    {
      cls: "nameClassName",
      sty: "nameStyle",
      base: "dropdown__name",
      phase: "default",
    },
    {
      cls: "menuClassName",
      sty: "menuStyle",
      base: "menu__panel",
      phase: "default",
    },
    {
      cls: "itemClassName",
      sty: "itemStyle",
      base: "menu__item",
      phase: "default",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base }) => {
      const user = userEvent.setup();
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <Dropdown
            name="Account"
            icon={Settings}
            items={[
              { label: "Edit", onClick: () => { } },
              { label: "Delete", onClick: () => { } },
            ]}
            {...overrides}
          />
        </ThemeProvider>,
      );
      await user.click(view.container.querySelector("button")!);
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <Dropdown
            name="Account"
            icon={Settings}
            items={[
              { label: "Edit", onClick: () => { } },
              { label: "Delete", onClick: () => { } },
            ]}
          />
        </ThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
