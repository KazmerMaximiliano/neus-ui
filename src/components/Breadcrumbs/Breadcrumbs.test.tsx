import { type AnchorHTMLAttributes, createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";
import * as stories from "./Breadcrumbs.stories";
import type { BreadcrumbsItem } from "./Breadcrumbs.types";

afterEach(cleanup);

const { Breadcrumbs: BreadcrumbsStory } = composeStories(stories);

const ITEMS: BreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Archive" },
  { label: "Neus", href: "/projects/neus" },
  { label: "Settings", href: "/projects/neus/settings" },
];

describe("Breadcrumbs", () => {
  describe("rendering", () => {
    it("is a labelled navigation list that ends at the current page", () => {
      render(<Breadcrumbs items={ITEMS} />);
      const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
      const list = within(nav).getByRole("list");

      expect(nav).toHaveClass("breadcrumbs");
      expect(list.tagName).toBe("OL");
      expect(within(list).getAllByRole("listitem")).toHaveLength(5);
      expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
      expect(screen.getByRole("link", { name: "Projects" })).toHaveClass("breadcrumbs__link");
      expect(screen.queryByRole("link", { name: "Settings" })).not.toBeInTheDocument();
      expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page");
      expect(screen.getByText("Settings")).toHaveClass("breadcrumbs__current");
    });

    it("writes an item without a link as plain text", () => {
      render(<Breadcrumbs items={ITEMS} />);

      expect(screen.queryByRole("link", { name: "Archive" })).not.toBeInTheDocument();
      expect(screen.getByText("Archive")).toHaveClass("breadcrumbs__item");
    });

    it("renders its story", () => {
      render(<BreadcrumbsStory />);

      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    });
  });

  describe("collapsing", () => {
    it("keeps the first item and the last ones around a button for the rest", async () => {
      const user = userEvent.setup();
      render(<Breadcrumbs items={ITEMS} maxItems={3} />);
      const expand = screen.getByRole("button", { name: "Show all breadcrumbs" });

      expect(screen.getAllByRole("listitem")).toHaveLength(4);
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Neus" })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
      expect(expand).toHaveClass("breadcrumbs__expand");

      await user.click(expand);

      expect(screen.getAllByRole("listitem")).toHaveLength(5);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Projects" })).toHaveFocus();
    });

    it("never collapses below the first and the current page", () => {
      render(<Breadcrumbs items={ITEMS} maxItems={1} />);

      expect(screen.getAllByRole("listitem")).toHaveLength(3);
      expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page");
    });

    it("shows everything when the items fit", () => {
      render(<Breadcrumbs items={ITEMS} maxItems={5} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("takes its labels and a router link component", () => {
      const RouterLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a data-router {...props} />;
      render(
        <Breadcrumbs
          items={ITEMS}
          maxItems={2}
          linkComponent={RouterLink}
          labels={{ navigation: "Ruta", expand: "Mostrar todo" }}
        />,
      );

      expect(screen.getByRole("navigation", { name: "Ruta" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Mostrar todo" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("data-router");
    });

    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLElement>();
      render(
        <Breadcrumbs
          ref={ref}
          aria-label="Location"
          items={ITEMS}
          maxItems={3}
          className="root"
          style={{ marginBlock: 8 }}
          listClassName="list"
          listStyle={{ color: "red" }}
          itemClassName="item"
          itemStyle={{ color: "red" }}
          linkClassName="link"
          linkStyle={{ color: "red" }}
          currentClassName="current"
          currentStyle={{ color: "red" }}
          expandClassName="expand"
          expandStyle={{ color: "red" }}
        />,
      );
      const red = { color: "rgb(255, 0, 0)" };

      expect(ref.current).toBe(screen.getByRole("navigation", { name: "Location" }));
      expect(ref.current).toHaveClass("breadcrumbs", "root");
      expect(ref.current).toHaveStyle({ marginBlock: "8px" });
      expect(screen.getByRole("list")).toHaveClass("breadcrumbs__list", "list");
      expect(screen.getByRole("list")).toHaveStyle(red);
      for (const item of screen.getAllByRole("listitem")) {
        expect(item).toHaveClass("breadcrumbs__item", "item");
        expect(item).toHaveStyle(red);
      }
      expect(screen.getByRole("link", { name: "Home" })).toHaveClass("breadcrumbs__link", "link");
      expect(screen.getByRole("link", { name: "Home" })).toHaveStyle(red);
      expect(screen.getByText("Settings")).toHaveClass("breadcrumbs__current", "current");
      expect(screen.getByText("Settings")).toHaveStyle(red);
      expect(screen.getByRole("button")).toHaveClass("breadcrumbs__expand", "expand");
      expect(screen.getByRole("button")).toHaveStyle(red);
    });

    it("rejects an item without a label", () => {
      // @ts-expect-error Each item needs its label.
      render(<Breadcrumbs items={[{ href: "/" }]} />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
