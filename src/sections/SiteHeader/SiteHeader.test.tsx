import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, type AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type { SiteHeaderProps } from "../../sections";
import { SiteHeader } from "../../sections";
import * as stories from "./SiteHeader.stories";

afterEach(cleanup);

const { SiteHeader: SiteHeaderStory } = composeStories(stories);
const LINKS = [{ label: "Servicios", href: "#servicios" }, { label: "Equipo", href: "/equipo", active: true }];

// The menu is a closed popover until the phone menu button opens it, so its contents count as hidden.
describe("SiteHeader", () => {
  it("renders a banner with the brand link and nothing else by default", () => {
    const { container } = render(<SiteHeader brand="Los Aromos" />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-variant", "plain");
    expect(screen.getByRole("link", { name: "Los Aromos" })).toHaveAttribute("href", "/");
    for (const part of [".site-header__menu", ".site-header__menu-button", ".site-header__skip"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it("wires the phone menu button to a popover that holds the navigation and the actions", () => {
    render(<SiteHeader brand="B" links={LINKS} actions={<button type="button">Pedir turno</button>} labels={{ menu: "Menú", navigation: "Principal" }} />);
    const button = screen.getByRole("button", { name: "Menú" });
    const menu = document.getElementById(button.getAttribute("popovertarget")!)!;
    expect(menu).toHaveAttribute("popover", "auto");
    expect(menu).toHaveClass("site-header__menu");
    expect(screen.getByRole("navigation", { name: "Principal", hidden: true }).parentElement).toBe(menu);
    expect(screen.getByRole("button", { name: "Pedir turno", hidden: true }).parentElement).toHaveClass("site-header__actions");
    expect(screen.getByRole("link", { name: "Equipo", hidden: true })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Servicios", hidden: true })).not.toHaveAttribute("aria-current");
  });

  it("closes the open menu when a link is followed", async () => {
    render(<SiteHeader brand="B" links={LINKS} />);
    const menu = document.querySelector<HTMLElement>("[popover]")!;
    vi.spyOn(menu, "matches").mockReturnValue(true);
    menu.hidePopover = vi.fn();
    await userEvent.click(screen.getByRole("link", { name: "Servicios", hidden: true }));
    expect(menu.hidePopover).toHaveBeenCalledOnce();
  });

  it("renders the skip link, the sticky variant and a router link component", () => {
    const RouterLink = ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a data-router="" href={href} {...props} />;
    render(<SiteHeader brand="B" links={LINKS} variant="sticky" skipLinkTarget="#main" linkComponent={RouterLink} />);
    expect(screen.getByRole("banner")).toHaveAttribute("data-variant", "sticky");
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("link", { name: "Equipo", hidden: true })).toHaveAttribute("data-router");
    expect(screen.getByRole("link", { name: "B" })).toHaveAttribute("data-router");
  });

  it("forwards native attributes, refs and every part's class and style", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <SiteHeader ref={ref} id="top" brand="B" links={LINKS} actions={<span>A</span>} skipLinkTarget="#main"
        className="h" style={{ color: "red" }} innerClassName="in" innerStyle={{ color: "red" }}
        brandClassName="br" brandStyle={{ color: "red" }} menuClassName="m" menuStyle={{ color: "red" }}
        linkClassName="l" linkStyle={{ color: "red" }} actionsClassName="ac" actionsStyle={{ color: "red" }}
        menuButtonClassName="mb" menuButtonStyle={{ color: "red" }} skipLinkClassName="sk" skipLinkStyle={{ color: "red" }} />,
    );
    expect(ref.current).toBe(screen.getByRole("banner"));
    expect(screen.getByRole("banner")).toHaveAttribute("id", "top");
    for (const [part, extra] of [["site-header", "h"], ["site-header__inner", "in"], ["site-header__brand", "br"], ["site-header__menu", "m"],
      ["site-header__link", "l"], ["site-header__actions", "ac"], ["site-header__menu-button", "mb"], ["site-header__skip", "sk"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element, part).toHaveClass(extra);
      expect(element, part).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<SiteHeaderStory />);
    expect(screen.getByRole("navigation", { name: "Main", hidden: true })).toBeInTheDocument();
  });

  it("requires a brand", () => {
    expectTypeOf<SiteHeaderProps>().toHaveProperty("linkComponent");
    // @ts-expect-error every site header names the site
    void (<SiteHeader links={LINKS} />);
  });
});
