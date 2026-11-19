import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Pagination } from "../Pagination";
import * as stories from "../Pagination.stories";

afterEach(cleanup);

const { Pagination: PaginationStory } = composeStories(stories);

describe("Pagination", () => {
  describe("rendering", () => {
    it("is a labelled navigation with numbered pages and the current one marked", () => {
      render(<Pagination page={10} totalPages={20} />);
      const nav = screen.getByRole("navigation", { name: "Pagination" });
      const current = screen.getByRole("button", { name: "Page 10" });

      expect(nav).toHaveClass("pagination", "pagination--pages");
      expect(within(nav).getByRole("list")).toHaveClass("pagination__list");
      expect(current).toHaveAttribute("aria-current", "page");
      expect(current).toHaveTextContent("10");
      expect(current).toHaveClass("pagination__page");
      expect(screen.getByRole("button", { name: "Page 9" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Page 20" })).toBeInTheDocument();
      expect(nav.querySelectorAll(".pagination__ellipsis")).toHaveLength(2);
      expect(nav.querySelector(".pagination__ellipsis")?.parentElement).toHaveAttribute("aria-hidden", "true");
    });

    it("disables previous on the first page and next on the last", () => {
      const { rerender } = render(<Pagination page={1} totalPages={3} />);

      expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();

      rerender(<Pagination page={3} totalPages={3} />);
      expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
      expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });

    it("keeps the page inside the range and shows one page when there are none", () => {
      const { rerender } = render(<Pagination page={9} totalPages={3} />);

      expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");

      rerender(<Pagination page={1} totalPages={0} />);
      expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });

    it("shows only previous and next around the position in the compact variant", () => {
      render(<Pagination variant="compact" page={2} totalPages={5} />);
      const info = screen.getByText("2 / 5");

      expect(screen.getByRole("navigation")).toHaveClass("pagination--compact");
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(info).toHaveClass("pagination__info");
      expect(info).toHaveAttribute("aria-live", "polite");
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("renders its story", () => {
      render(<PaginationStory />);

      expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: "Items per page" })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("calls onChange with the page chosen, and not for the current one", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination page={5} totalPages={10} onChange={onChange} />);

      await user.click(screen.getByRole("button", { name: "Page 6" }));
      await user.click(screen.getByRole("button", { name: "Previous page" }));
      await user.click(screen.getByRole("button", { name: "Next page" }));
      await user.click(screen.getByRole("button", { name: "Page 5" }));

      expect(onChange.mock.calls).toEqual([[6], [4], [6]]);
    });

    it("moves one page at a time in the compact variant", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Pagination variant="compact" page={2} totalPages={5} onChange={onChange} />);

      await user.click(screen.getByRole("button", { name: "Next page" }));

      expect(onChange).toHaveBeenCalledExactlyOnceWith(3);
    });

    it("changes the page size through its select", async () => {
      const user = userEvent.setup();
      const onPageSizeChange = vi.fn();
      render(
        <Pagination
          page={1}
          totalPages={4}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          onPageSizeChange={onPageSizeChange}
        />,
      );
      const select = screen.getByRole("combobox", { name: "Items per page" });

      expect(select).toHaveTextContent("10");
      await user.click(select);
      await user.click(screen.getByRole("option", { name: "25" }));

      expect(onPageSizeChange).toHaveBeenCalledExactlyOnceWith(25);
    });

    it("shows no page-size select without options or a size", () => {
      const { rerender } = render(<Pagination page={1} totalPages={4} pageSize={10} />);

      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

      rerender(<Pagination page={1} totalPages={4} pageSizeOptions={[10, 25]} />);
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("takes its labels", () => {
      render(
        <Pagination
          page={2}
          totalPages={3}
          pageSize={10}
          pageSizeOptions={[10]}
          labels={{
            navigation: "Results pages",
            previous: "Back",
            next: "Forward",
            page: (page) => `Go to page ${page}`,
            pageSize: "Per page",
          }}
        />,
      );

      expect(screen.getByRole("navigation", { name: "Results pages" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Forward" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 2" })).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: "Per page" })).toBeInTheDocument();
    });

    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLElement>();
      const parts = {
        className: "root",
        style: { marginBlock: 8 },
        listClassName: "list",
        listStyle: { color: "red" },
        pageClassName: "page",
        pageStyle: { color: "red" },
        ellipsisClassName: "ellipsis",
        ellipsisStyle: { color: "red" },
        pageSizeClassName: "size",
        pageSizeStyle: { color: "red" },
      };
      const { container, rerender } = render(
        <Pagination ref={ref} id="pages" page={10} totalPages={20} pageSize={10} pageSizeOptions={[10]} {...parts} />,
      );
      const red = { color: "rgb(255, 0, 0)" };

      expect(ref.current).toHaveAttribute("id", "pages");
      expect(ref.current).toHaveClass("pagination", "root");
      expect(ref.current).toHaveStyle({ marginBlock: "8px" });
      expect(screen.getByRole("list")).toHaveClass("list");
      expect(screen.getByRole("list")).toHaveStyle(red);
      for (const page of container.querySelectorAll(".pagination__page")) {
        expect(page).toHaveClass("page");
        expect(page).toHaveStyle(red);
      }
      for (const ellipsis of container.querySelectorAll(".pagination__ellipsis")) {
        expect(ellipsis).toHaveClass("ellipsis");
        expect(ellipsis).toHaveStyle(red);
      }
      expect(container.querySelector(".pagination__page-size")).toHaveClass("size");
      expect(container.querySelector(".pagination__page-size")).toHaveStyle(red);

      rerender(<Pagination variant="compact" page={1} totalPages={2} infoClassName="info" infoStyle={{ color: "red" }} />);
      expect(screen.getByText("1 / 2")).toHaveClass("pagination__info", "info");
      expect(screen.getByText("1 / 2")).toHaveStyle(red);
    });

    it("requires the page and the page count", () => {
      // @ts-expect-error The current page and the total are required.
      render(<Pagination />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
