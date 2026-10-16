import { render as renderCustomization } from "@testing-library/react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AppTemplate as CustomizationComponent } from "./AppTemplate";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { AppTemplate } from "./AppTemplate";

afterEach(cleanup);

it("keeps Sidebar hooks independent from the shell's sidebar container", () => {
  const view = render(<AppTemplate
    routes={[]}
    sidebarClassName="navigation-root"
    sidebarStyle={{ padding: 7 }}
    sidebarContainerClassName="navigation-container"
    sidebarContainerStyle={{ padding: 11 }}
  >Content</AppTemplate>);
  expect(view.container.querySelector(".sidebar")).toHaveClass("navigation-root");
  expect(view.container.querySelector(".sidebar")).toHaveStyle({ padding: "7px" });
  expect(view.container.querySelector(".app-template__sidebar")).toHaveClass("navigation-container");
  expect(view.container.querySelector(".app-template__sidebar")).toHaveStyle({ padding: "11px" });
  view.rerender(<AppTemplate routes={[]}>Content</AppTemplate>);
  expect(view.container.querySelector(".navigation-root, .navigation-container")).toBeNull();
});

describe("AppTemplate responsive integration", () => {
  it("delegates the only mobile menu to Sidebar and preserves routes, menu and children", () => {
    act(() => {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
      window.dispatchEvent(new Event("resize"));
    });
    const { container } = render(<AppTemplate routes={[{ label: "Home" }]}
      menu={<button>Account</button>}><h1>Content</h1></AppTemplate>);
    expect(screen.getAllByRole("button", { name: "Abrir menú" })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Account" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Content" })).toBeInTheDocument();
    expect(container.querySelector(".app-template__overlay")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    act(() => {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Abrir menú" })).not.toBeInTheDocument();
  });
});


describe("AppTemplate part customization", () => {
  it.each([
    {
      "cls": "className",
      "sty": "style",
      "base": "app-template",
      "phase": "default"
    },
    {
      "cls": "headerClassName",
      "sty": "headerStyle",
      "base": "app-template__header",
      "phase": "default"
    },
    {
      "cls": "sidebarContainerClassName",
      "sty": "sidebarContainerStyle",
      "base": "app-template__sidebar",
      "phase": "default"
    },
    {
      "cls": "contentClassName",
      "sty": "contentStyle",
      "base": "app-template__content",
      "phase": "default"
    },
    {
      "cls": "contentContainerClassName",
      "sty": "contentContainerStyle",
      "base": "app-template__content-container",
      "phase": "default"
    }
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base }) => {
      const overrides = { [cls]: "consumer-part", [sty]: { outlineOffset: "7px" } };
      const view = renderCustomization(<CustomizationThemeProvider scope="local"><CustomizationComponent
        title="Workspace"
        routes={[{ label: "Home" }]}
        menu={<button>Account</button>}
        {...overrides}
      ><h1>Content</h1></CustomizationComponent></CustomizationThemeProvider>);
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(<CustomizationThemeProvider scope="local"><CustomizationComponent
        title="Workspace"
        routes={[{ label: "Home" }]}
        menu={<button>Account</button>}
      ><h1>Content</h1></CustomizationComponent></CustomizationThemeProvider>);
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
