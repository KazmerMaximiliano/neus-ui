import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";
import * as stories from "./Tabs.stories";
import type { TabsItem } from "./Tabs.types";

afterEach(cleanup);

const { Tabs: TabsStory } = composeStories(stories);

const ITEMS: TabsItem[] = [
  { value: "general", label: "General", content: "General settings" },
  { value: "members", label: "Members", content: "Member list" },
  { value: "billing", label: "Billing", content: "Invoices", disabled: true },
  { value: "danger", label: "Danger zone", content: "Delete project" },
];

describe("Tabs", () => {
  describe("rendering", () => {
    it("links each tab to its panel and shows the first enabled one", () => {
      render(<Tabs label="Project settings" items={ITEMS} />);
      const list = screen.getByRole("tablist", { name: "Project settings" });
      const tab = screen.getByRole("tab", { name: "General" });
      const panel = screen.getByRole("tabpanel", { name: "General" });

      expect(list).toHaveClass("tabs__list");
      expect(list.parentElement).toHaveClass("tabs", "tabs--line");
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(tab).toHaveAttribute("aria-controls", panel.id);
      expect(tab).toHaveAttribute("tabindex", "0");
      expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("tabindex", "-1");
      expect(panel).toHaveTextContent("General settings");
      expect(panel).toHaveAttribute("tabindex", "0");
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      expect(screen.getByText("Member list")).not.toBeVisible();
    });

    it("starts on defaultValue and skips a disabled or unknown value", () => {
      const { rerender } = render(<Tabs items={ITEMS} defaultValue="members" />);

      expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("aria-selected", "true");

      rerender(<Tabs items={ITEMS} value="billing" />);
      expect(screen.getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");

      rerender(<Tabs items={ITEMS} value="missing" />);
      expect(screen.getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");
    });

    it("applies the contained variant", () => {
      const { container } = render(<Tabs items={ITEMS} variant="contained" />);

      expect(container.firstChild).toHaveClass("tabs--contained");
    });

    it("renders nothing selectable when every tab is disabled", () => {
      render(<Tabs items={ITEMS.map((item) => ({ ...item, disabled: true }))} />);

      expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
      for (const tab of screen.getAllByRole("tab")) expect(tab).toBeDisabled();
    });

    it("renders its story", () => {
      render(<TabsStory />);

      expect(screen.getByRole("tablist", { name: "Project settings" })).toBeInTheDocument();
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("selects a tab on click and calls onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Tabs items={ITEMS} onChange={onChange} />);

      await user.click(screen.getByRole("tab", { name: "Members" }));

      expect(onChange).toHaveBeenCalledExactlyOnceWith("members");
      expect(screen.getByRole("tabpanel", { name: "Members" })).toHaveTextContent("Member list");
      await user.click(screen.getByRole("tab", { name: "Members" }));
      expect(onChange).toHaveBeenCalledOnce();
    });

    it("moves and selects with the arrow keys, Home and End, skipping disabled tabs", async () => {
      const user = userEvent.setup();
      render(<Tabs items={ITEMS} />);

      await user.tab();
      expect(screen.getByRole("tab", { name: "General" })).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "Members" })).toHaveFocus();
      expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "Danger zone" })).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("tab", { name: "Danger zone" })).toHaveFocus();

      await user.keyboard("{Home}");
      expect(screen.getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{End}");
      expect(screen.getByRole("tab", { name: "Danger zone" })).toHaveAttribute("aria-selected", "true");

      await user.tab();
      expect(screen.getByRole("tabpanel", { name: "Danger zone" })).toHaveFocus();
    });

    it("reverses the arrow keys in right-to-left text", async () => {
      const user = userEvent.setup();
      render(<div dir="rtl"><Tabs items={ITEMS} /></div>);

      await user.tab();
      await user.keyboard("{ArrowLeft}");

      expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("aria-selected", "true");
    });

    it("leaves the selection to a controlled value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Tabs items={ITEMS} value="general" onChange={onChange} />);

      await user.click(screen.getByRole("tab", { name: "Members" }));

      expect(onChange).toHaveBeenCalledWith("members");
      expect(screen.getByRole("tab", { name: "General" })).toHaveAttribute("aria-selected", "true");
    });

    it("ignores other keys", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Tabs items={ITEMS} onChange={onChange} />);

      await user.tab();
      await user.keyboard("{ArrowDown}");

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("customization", () => {
    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <Tabs
          ref={ref}
          id="settings"
          items={ITEMS}
          className="root"
          style={{ marginBlock: 8 }}
          listClassName="list"
          listStyle={{ color: "red" }}
          tabClassName="tab"
          tabStyle={{ color: "red" }}
          panelClassName="panel"
          panelStyle={{ color: "red" }}
        />,
      );

      expect(ref.current).toBe(container.firstChild);
      expect(ref.current).toHaveAttribute("id", "settings");
      expect(ref.current).toHaveClass("tabs", "root");
      expect(ref.current).toHaveStyle({ marginBlock: "8px" });
      expect(screen.getByRole("tablist")).toHaveClass("tabs__list", "list");
      expect(screen.getByRole("tablist")).toHaveStyle({ color: "rgb(255, 0, 0)" });
      for (const tab of screen.getAllByRole("tab")) {
        expect(tab).toHaveClass("tabs__tab", "tab");
        expect(tab).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }
      for (const panel of container.querySelectorAll(".tabs__panel")) {
        expect(panel).toHaveClass("panel");
        expect(panel).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }
    });

    it("rejects an item without content", () => {
      // @ts-expect-error Each item needs content for its panel.
      render(<Tabs items={[{ value: "a", label: "A" }]} />);

      expect(screen.getByRole("tab", { name: "A" })).toBeInTheDocument();
    });
  });
});
