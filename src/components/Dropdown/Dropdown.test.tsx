import {
  cleanup,
  fireEvent as fireCustomization,
  fireEvent,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings as CustomizationIcon, User } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { Dropdown as CustomizationComponent, Dropdown } from "./Dropdown";

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
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            name="Account"
            icon={CustomizationIcon}
            items={[
              { label: "Edit", onClick: () => { } },
              { label: "Delete", onClick: () => { } },
            ]}
            {...overrides}
          />
        </CustomizationThemeProvider>,
      );
      fireCustomization.click(view.container.querySelector("button")!);
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            name="Account"
            icon={CustomizationIcon}
            items={[
              { label: "Edit", onClick: () => { } },
              { label: "Delete", onClick: () => { } },
            ]}
          />
        </CustomizationThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
