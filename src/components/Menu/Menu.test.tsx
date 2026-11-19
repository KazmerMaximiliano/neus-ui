import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoreVertical,Settings } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers";
import { Menu } from "./Menu";

afterEach(cleanup);

const items = () => [
  { label: "Edit", onClick: vi.fn() },
  { label: "Archive", onClick: vi.fn(), disabled: true },
  { label: "Delete", onClick: vi.fn() },
];

describe("Menu", () => {
  describe("rendering", () => {
    it("renders a text trigger that announces a menu", () => {
      render(<Menu text="Options" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Options" });
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveClass("button", "button--text");
    });

    it("renders an icon trigger named by text or a default label", () => {
      const { rerender } = render(
        <Menu icon={MoreVertical} text="Row actions" items={items()} />,
      );
      const trigger = screen.getByRole("button", { name: "Row actions" });
      expect(trigger).toHaveClass("icon-button", "icon-button--text");
      expect(trigger.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      rerender(<Menu icon={MoreVertical} items={items()} />);
      expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
    });

    it("keeps items out of the DOM while closed", () => {
      render(<Menu text="Options" items={items()} />);
      expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens, focuses the first item and closes on a second click", async () => {
      const user = userEvent.setup();
      render(<Menu text="Options" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Options" });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("menu", { name: "Options" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      await user.click(trigger);
      expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("moves focus with arrow keys and skips disabled items", async () => {
      const user = userEvent.setup();
      render(<Menu text="Options" items={items()} />);
      await user.click(screen.getByRole("button", { name: "Options" }));
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      await user.keyboard("{End}");
      expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
      await user.keyboard("{Home}");
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    });

    it("runs the item action, closes and returns focus to the trigger", async () => {
      const user = userEvent.setup();
      const list = items();
      render(<Menu text="Options" items={list} />);
      const trigger = screen.getByRole("button", { name: "Options" });
      await user.click(trigger);
      await user.click(screen.getByRole("menuitem", { name: "Delete" }));
      expect(list[2].onClick).toHaveBeenCalledOnce();
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    it("closes on Escape with focus restored and on outside clicks", async () => {
      const user = userEvent.setup();
      render(<Menu text="Options" items={items()} />);
      const trigger = screen.getByRole("button", { name: "Options" });
      await user.click(trigger);
      await user.keyboard("{Escape}");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
      await user.click(trigger);
      await user.click(document.body);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("closes when focus leaves with Tab", async () => {
      const user = userEvent.setup();
      render(<Menu text="Options" items={items()} />);
      await user.click(screen.getByRole("button", { name: "Options" }));
      await user.tab();
      expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("applies menuStyle and itemStyle to their parts", async () => {
      const user = userEvent.setup();
      render(
        <Menu
          text="Options"
          items={items()}
          menuStyle={{ minWidth: 300 }}
          itemStyle={{ paddingLeft: 30 }}
        />,
      );
      await user.click(screen.getByRole("button", { name: "Options" }));
      expect(screen.getByRole("menu")).toHaveStyle({ minWidth: "300px" });
      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveStyle({
        paddingLeft: "30px",
      });
    });
  });
});

describe("Menu part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "menu",
      phase: "default",
    },
    {
      cls: "triggerClassName",
      sty: "triggerStyle",
      base: "button",
      phase: "default",
    },
    {
      cls: "iconButtonIconClassName",
      sty: "iconButtonIconStyle",
      base: "icon-button-icon",
      phase: "icon",
    },
    {
      cls: "buttonLabelClassName",
      sty: "buttonLabelStyle",
      base: "button-label",
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
    async ({ cls, sty, base, phase }) => {
      const user = userEvent.setup();
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <Menu
            text="Actions"
            icon={phase === "icon" ? Settings : undefined}
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
          <Menu
            text="Actions"
            icon={phase === "icon" ? Settings : undefined}
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
