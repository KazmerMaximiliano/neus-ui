import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef, type AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { SiteFooterProps } from "../../sections";
import { SiteFooter } from "../../sections";
import * as stories from "./SiteFooter.stories";

afterEach(cleanup);

const { SiteFooter: SiteFooterStory } = composeStories(stories);
const COLUMNS = [{ title: "Clínica", links: [{ label: "Servicios", href: "#servicios" }, { label: "Equipo", href: "/equipo" }] }];

describe("SiteFooter", () => {
  it("renders a content-info landmark with only the legal line", () => {
    const { container } = render(<SiteFooter legal="© 2027 Jornadas Frontend Córdoba" />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("site-footer");
    expect(footer).not.toHaveAttribute("data-columns");
    expect(container.querySelector(".site-footer__top")).not.toBeInTheDocument();
    expect(screen.getByText("© 2027 Jornadas Frontend Córdoba")).toHaveClass("site-footer__legal");
  });

  it("renders each column as navigation named by its title", () => {
    render(<SiteFooter brand="Los Aromos" columns={COLUMNS} />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-columns");
    const nav = screen.getByRole("navigation", { name: "Clínica" });
    expect(nav).toHaveClass("site-footer__column");
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Los Aromos")).toHaveClass("site-footer__brand");
  });

  it("uses a router link component and forwards native attributes, refs and every part hook", () => {
    const RouterLink = ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a data-router="" href={href} {...props} />;
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <SiteFooter ref={ref} id="f" brand="B" columns={COLUMNS} legal="L" linkComponent={RouterLink} className="f" style={{ color: "red" }}
        innerClassName="in" innerStyle={{ color: "red" }} brandClassName="b" brandStyle={{ color: "red" }} columnClassName="c" columnStyle={{ color: "red" }}
        columnTitleClassName="ct" columnTitleStyle={{ color: "red" }} linkClassName="l" linkStyle={{ color: "red" }} legalClassName="lg" legalStyle={{ color: "red" }} />,
    );
    expect(ref.current).toBe(screen.getByRole("contentinfo"));
    expect(screen.getByRole("link", { name: "Equipo" })).toHaveAttribute("data-router");
    for (const [part, extra] of [["site-footer", "f"], ["site-footer__inner", "in"], ["site-footer__brand", "b"], ["site-footer__column", "c"],
      ["site-footer__column-title", "ct"], ["site-footer__link", "l"], ["site-footer__legal", "lg"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element, part).toHaveClass(extra);
      expect(element, part).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<SiteFooterStory />);
    expect(screen.getAllByRole("navigation")).toHaveLength(2);
  });

  it("types the columns", () => {
    expectTypeOf<SiteFooterProps>().toHaveProperty("columns");
    // @ts-expect-error a column lists links with a label and an href
    void (<SiteFooter columns={[{ title: "T", links: ["/a"] }]} />);
  });
});
