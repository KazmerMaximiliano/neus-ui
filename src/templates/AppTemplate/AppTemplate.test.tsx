import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AppTemplate } from "./AppTemplate";

afterEach(cleanup);

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
